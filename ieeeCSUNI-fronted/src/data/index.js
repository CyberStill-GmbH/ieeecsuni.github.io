// ── Events ────────────────────────────────────────────────
export const events = [
  {
    id: 1,
    type: 'Taller',
    title: 'Introducción a la programación con C',
    date: '15 Abr 2025',
    time: '18:00 – 21:00',
    location: 'Virtual-GoogleMeet',
    description: 'Aprende las bases de la programación estructurada con el lenguaje C.',
    tag: 'Programación',
    gradient: 'linear-gradient(135deg, #004f77, #00263d)',
    spots: 30,
    spotsLeft: 30,
  },

]


// ── Team ──────────────────────────────────────────────────
export const team = [
  { initials: 'AE', name: 'Angel Escudero',       role: 'Presidente',         bio: 'Estudiante de ingeniería de telecomunicaciones.',              gradient: 'linear-gradient(135deg,#006699,#003050)' },
  { initials: 'KP', name: 'Kenneth Pecho',  role: 'Vicepresidente',     bio: 'Estudiante de ingeniería electrónica.',     gradient: 'linear-gradient(135deg,#004d80,#002040)' },
  { initials: 'DF', name: 'Denilson Flores',  role: 'Tesorero',           bio: 'Estudiante de ingeniería de telecomunicaciones',                  gradient: 'linear-gradient(135deg,#660033,#330019)' },
  { initials: 'JA', name: 'Juan Aguilar',  role: 'Eventos y Logística',       bio: 'Estudiante de ingeniería de telecomunicaciones.',                       gradient: 'linear-gradient(135deg,#662200,#331100)' },
  { initials: 'AG', name: 'Adrian Guevara', role: 'Webmaster y Secretario General',          bio: 'Estudiante de ingeniería de ciberseguridad.',              gradient: 'linear-gradient(135deg,#440066,#220033)' },
  { initials: 'IB', name: 'Isaac Becerra',   role: 'Relaciones Públicas', bio: 'estudiante de Ingeniería de Ciberseguridad.',            gradient: 'linear-gradient(135deg,#006666,#003333)' },
  { initials: 'JP', name: 'Jesús Pajar',    role: 'Marketing y Publicidad',     bio: 'Estudiante de ingeniería de ciberseguridad.',        gradient: 'linear-gradient(135deg,#336600,#193300)' },
  { initials: 'RV', name: 'Rafael Villavicencio',    role: 'Capacitación',     bio: 'Estudiante de ingeniería electrónica.',        gradient: 'linear-gradient(135deg,#336600,#193500)' },
  { initials: 'JA', name: 'José Ataurima',    role: 'Proyectos de Investigación',     bio: 'Estudiante de ingeniería de sistemas.',        gradient: 'linear-gradient(135deg,#336600,#193200)' },
]
// ── Resources ─────────────────────────────────────────────
export const resources = [
  {
    title: "IEEE Xplore Digital Library",
    category: "IEEE Xplore",
    description: "Acceso a millones de documentos técnicos de alta calidad en ingeniería y computación.", 
    url: "https://ieeexplore.ieee.org/", 
    date: "2026"
  },
  {
    title: "Recopilación de libros gratuitos de programación",
    category: "Programación",
    excerpt: "Una recopilación de más de 100 libros de programación, desde bases hasta frameorks modernos y arquitectura de sistemas.",
    link: "https://librosgratis.dev/", 
    date: "Abril 2026"
  }
]
// ── Achievements ──────────────────────────────────────────
export const achievements = [
  { number: '3°',   label: 'Lugar IEEE Xtreme Perú 2023' },
  { number: '500+', label: 'Recursos en biblioteca digital' },
  { number: '85%',  label: 'Miembros consiguen empleo tech' },
  { number: '20+',  label: 'Países con miembros conectados' },
]

// ── Timeline ──────────────────────────────────────────────
export const timeline = [
  { year: 'Febrero 2026', title: 'Reactivación del capítulo.',   desc: 'Un grupo de estudiantes de FIEE deciden reestructurar el capitulo IEEE CS UNI.' },
]

// ── Nav links ─────────────────────────────────────────────
export const navLinks = [
  { to: '/nosotros',  label: 'Nosotros' },
  { to: '/eventos',   label: 'Eventos' },
  { to: '/recursos',  label: 'Recursos' },
  { to: '/proyectos',  label: 'Proyectos' },
  { to: '/equipo',    label: 'Equipo' },
  { to: '/contacto',  label: 'Contacto' },
]

// ── Footer links ──────────────────────────────────────────
export const footerLinks = {
  'Capítulo': [
    { label: 'Nosotros',  to: '/nosotros' },
    { label: 'Equipo',    to: '/equipo' },
    { label: 'Historia',  to: '/nosotros' },
    { label: 'Únete',     to: '/contacto' },
  ],
  'Actividades': [
    { label: 'Eventos',     to: '/eventos' },
    { label: 'Hackathons',  to: '/eventos' },
    { label: 'Competencias', to: '/eventos' },
    { label: 'Talleres',    to: '/eventos' },
  ],
  'Recursos': [
    { label: 'Biblioteca',  to: '/recursos' },
    { label: 'Tutoriales',  to: '/recursos' },
    { label: 'Templates',   to: '/recursos' },
    { label: 'Comunidad',   to: '/recursos' },
  ],
}
// ── Chapter projects ────────────────────────────────────────── 
export const projects = [
  {
    id: 1,
    title: "IEEE CS Portal",
    description: "Plataforma oficial para la gestión de recursos y miembros del capítulo utilizando React y Tailwind.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    tags: ["React", "Tailwind", "Vite"],
    github: "https://github.com/ieeecsuni",
    link: "https://ieeecsuni.org",
    members: ["César", "Bayron", "Integrantes CS"]
  },
  {
    id: 2,
    title: "Cyber Mascota",
    description: "Desarrollo de animaciones interactivas y efectos de partículas para la identidad visual del capítulo.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    tags: ["CSS", "SVG", "Animation"],
    github: "https://github.com/ieeecsuni",
    link: "#",
    members: ["César"]
  }
];
