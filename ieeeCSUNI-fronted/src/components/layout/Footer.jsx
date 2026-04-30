import { Link } from 'react-router-dom'
import { IEEECSLogo } from '../../assets/IEEECSLogo'
import { footerLinks } from '../../data'
import {
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaEnvelope,
  FaYoutube,
  FaTiktok,
} from 'react-icons/fa'

const socials = [
  { Icon: FaLinkedin,  href: 'https://www.linkedin.com/company/ieee-cs-uni-sb/', title: 'LinkedIn'  },
  { Icon: FaInstagram, href: 'https://www.instagram.com/ieee.cs.uni/',            title: 'Instagram' },
  { Icon: FaYoutube,   href: 'https://www.youtube.com/@IEEE-CS-UNI',              title: 'YouTube'   },
  { Icon: FaTiktok,    href: 'https://www.tiktok.com/@ieee.cs.uni?lang=es-419',   title: 'TikTok'    },
  { Icon: FaWhatsapp,  href: 'https://www.whatsapp.com/channel/0029Vb7ULtl9MF99Felbfi1c', title: 'WhatsApp' },
  { Icon: FaEnvelope,  href: 'mailto:ieeecs@uni.edu.pe',                          title: 'Email'     },
]

export function Footer() {
  return (
    <footer className="relative z-10 pt-16 pb-8 px-6 md:px-20 border-t border-white/[0.06] bg-[#020617]">
      <div className="max-w-7xl mx-auto">

        {/* Grid principal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-12">

          {/* Columna de marca */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <IEEECSLogo size={36} />
              <div>
                <div className="text-sm font-bold text-white">IEEE CS</div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-gray-600">
                  UNI Chapter
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              Capítulo estudiantil de la IEEE Computer Society en la Universidad
              Nacional de Ingeniería, Lima, Perú.
            </p>

            {/* Redes sociales */}
            <div className="flex flex-wrap gap-2 mt-6">
              {socials.map(({ Icon, href, title }) => (
                <a
                  key={title}
                  href={href}
                  title={title}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-white/[0.06] text-gray-600
                             hover:text-sky-400 hover:border-sky-500/30 hover:bg-sky-500/[0.06]
                             transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Columnas de links */}
          {Object.entries(footerLinks).map(([col, links]) => (
            <div key={col}>
              <h5 className="text-xs font-bold text-white uppercase tracking-widest mb-5">
                {col}
              </h5>
              <ul className="flex flex-col gap-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      onClick={() => window.scrollTo(0, 0)}
                      className="text-sm text-gray-500 hover:text-white transition-colors duration-200"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/[0.05] flex flex-col md:flex-row justify-between items-center gap-3">
          <span className="font-mono text-[11px] text-gray-700">
            © {new Date().getFullYear()} IEEE Computer Society — UNI Student Chapter
          </span>
          <span className="font-mono text-[11px] text-gray-700">
            Lima, Perú ·{' '}
            <a
              href="https://computer.org"
              target="_blank"
              rel="noreferrer"
              className="text-gray-700 hover:text-sky-500 transition-colors duration-200"
            >
              computer.org
            </a>
          </span>
        </div>

      </div>
    </footer>
  )
}