{{-- resources/views/emails/auto-reply.blade.php --}}
@component('mail::message')
# Hola, {{ $contact->nombre }}

@if($contact->tipo === 'miembro')
Hemos recibido tu solicitud de membresía al capítulo IEEE CS UNI.
Revisaremos tu perfil y te contactaremos pronto.
@elseif($contact->tipo === 'evento')
Hemos recibido tu propuesta de evento. Nuestro equipo la evaluará
y te responderemos en los próximos días.
@elseif($contact->tipo === 'mentor')
Gracias por postular como mentor. Valoramos mucho tu interés en
guiar a los miembros del capítulo.
@endif

Puedes seguirnos en nuestras redes para estar al tanto de novedades.

Saludos,  
**IEEE CS UNI**
@endcomponent