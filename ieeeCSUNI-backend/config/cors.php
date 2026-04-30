<?php

return [
    'paths'           => ['api/*'],
    'allowed_origins' => [
        'http://localhost:5173',
        'https://ieeecsuni.vercel.app/',  
    ],
    'allowed_methods' => ['*'],
    'allowed_headers' => ['*'],
];