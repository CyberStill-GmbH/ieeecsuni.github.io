<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\AutoReplyMail;
use App\Mail\ContactNotification;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $base = $request->validate([
            'tipo'   => 'required|in:miembro,evento,mentor',
            'nombre' => 'required|string|max:255',
            'email'  => 'required|email',
            'mensaje'=> 'nullable|string',
        ]);

        //Validación extra según tiempo (Hay PC de CBG01 y no he estudiado nada ;())
        $extra = match($request->tipo) {
            'miembro' => $request->validate([
                'carrera' => 'required|string',
                'ciclo' => 'required|string',
            ]),
            'evento' => $request->validate([
                'tipoEvento' => 'nullable|string',
                'fechaProbable' => 'nullable|date',
            ]),
            'mentor' => $request->validate([
                'areaExperticia' => 'nullable|string',
            ]),
            default => [],
        };

        $contact = Contact::create([
            ...$base,
            'carrera' => $request->carrera,
            'ciclo' => $request->ciclo,
            'tipo_evento' => $request->tipoEvento,
            'fecha_probable' => $request->fechaProbable,
            'area_experticia' => $request->areaExperticia,
        ]);

        Mail::to('contacto@landing.ieeecsuni.com')->send(new ContactNotification($contact));
        Mail::to($contact->email)->send(new AutoReplyMail($contact));
        
        return response()->json(['success' => true, 'message' => 'Solicitud enviada'], 201);
    }
}
