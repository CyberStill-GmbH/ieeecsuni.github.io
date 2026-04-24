import ieeeWeb from '../../public/projects/ieee-web/p1.png' 
import codenix from '../../public/projects/codenix/p1.png' 
/**
 * data.js — IEEE CS UNI Projects
 *
 * ─── DÓNDE PONER LAS IMÁGENES ────────────────────────────────────────────
 *
 *  Opción A (recomendada) — carpeta public/
 *  ┌─ public/
 *  │   └─ projects/
 *  │       ├─ codenix/
 *  │       │   ├─ preview-1.png   ← screenshot pantalla principal
 *  │       │   ├─ preview-2.png   ← otra vista / feature
 *  │       │   └─ preview-3.png   ← detalle móvil, dark mode, etc.
 *  │       └─ ieee-web/
 *  │           ├─ preview-1.png
 *  │           └─ preview-2.png
 *  └─ src/
 *
 *  Referéncialas como strings: '/projects/codenix/preview-1.png'
 *  Vite las sirve directamente, sin import.
 *
 *  Opción B — import estático (solo si quieres hash en el nombre del archivo)
 *  import codenixP1 from './assets/projects/codenix/p1.png'
 *  import codenixP2 from './assets/projects/codenix/p2.png'
 *  ...y luego úsalas en el array `images` abajo.
 *
 *  Tamaño recomendado: 1280×720 px (16:9), < 300 KB por imagen (WebP ideal)
 * ─────────────────────────────────────────────────────────────────────────
 */
 
export const categories = [
  'Web Dev',
  'Inteligencia Artificial',
  'Ciberseguridad',
  'Cloud Computing',
  'Redes',
  'Mobile',
  'IoT',
  'Investigación',
]

export const projects = [
  {
    id: 'ieee-web',
    title: 'IEEE CS UNI Web',
    category: 'Web Dev',
    description:
      'Plataforma web oficial del capítulo estudiantil IEEE Computer Society UNI. Sistema de roles (user / member / admin), gestión de eventos, proyectos y membresías.',
    tags: ['React', 'Vite', 'Tailwind', 'Laravel'],
    github: 'https://github.com/ieeecs-uni/web',
    link: 'https://ieeecs-uni.com',
    image: ieeeWeb,
    members: ['Cesar Adrian Guevara Salcedo'],
  },

  {
    id: 'codenix',
    title: 'Codenix',
    category: 'Web Dev',
    description:
      'Plataforma de práctica, competición y comunidad para estudiantes de la UNI. Jueces automáticos, rankings en tiempo real y editorial colaborativo.',
    tags: ['React', 'Laravel', 'Docker'],
    github: 'https://github.com/ieeecs-uni/codenix',
    link: 'https://codenix.ieeecs-uni.com',
    image: codenix,
    members: ['Cesar Adrian Guevara Salcedo'],
  },
]