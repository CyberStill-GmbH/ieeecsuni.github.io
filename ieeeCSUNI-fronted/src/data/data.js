import ieeeWeb from '../../public/projects/ieee-web/p1.png' 
import codenix from '../../public/projects/codenix/p1.png' 

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
    github: 'https://github.com/ieeecsuni-droid/ieeecsuni.github.io',
    link: 'https://ieeecsuni-droid.github.io/ieeecsuni.github.io/',
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