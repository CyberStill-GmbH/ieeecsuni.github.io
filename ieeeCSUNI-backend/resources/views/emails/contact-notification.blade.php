{{-- resources/views/emails/contact-notification.blade.php --}}
@component('mail::message')
# Nueva solicitud: {{ ucfirst($contact->tipo) }}

**Nombre:** {{ $contact->nombre }}
**Email:** {{ $contact->email }}

@if($contact->tipo === 'miembro')
**Carrera:** {{ $contact->carrera }}  
**Ciclo:** {{ $contact->ciclo }}
@elseif($contact->tipo === 'evento')
**Tipo de evento:** {{ $contact->tipo_evento }}  
**Fecha tentativa:** {{ $contact->fecha_probable }}
@elseif($contact->tipo === 'mentor')
**Área de especialidad:** {{ $contact->area_experticia }}
@endif

**Mensaje:** {{ $contact->mensaje }}
@endcomponent