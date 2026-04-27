<?php

return [
    'paths'           => ['api/*'],
    'allowed_origins' => [
        'http://localhost:5173',
        'https://tu-web.vercel.app',  
    ],
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],
];