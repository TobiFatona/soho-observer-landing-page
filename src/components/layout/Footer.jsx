import GoldEyeLogo from '@/components/ui/GoldEyeLogo'
import { Instagram, Twitter, Youtube } from 'lucide-react'

const footerLinks = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Download', href: '#' },
  ],
  Company: [
    { label: 'Press', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
}

const socials = [
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Twitter, label: 'Twitter / X' },
  { Icon: Youtube, label: 'YouTube' },
]

export default function Footer() {
  return (
    <footer className="bg-charcoal pt-16 pb-10 px-[8vw]">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col lg:flex-row gap-12 pb-12 border-b border-white/10">

          <div className="flex-1 max-w-xs">
            <GoldEyeLogo size={24} textColor="text-parchment" className="mb-5" />
            <p className="font-sans text-sm text-gray-warm leading-relaxed">
              Fashion intelligence in your pocket. Identify, shop, and archive any look — instantly.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-gray-warm hover:text-gold hover:border-gold/40 transition-colors duration-300"
                >
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-10 lg:gap-16">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <p className="label-editorial text-gray-warm mb-5">{category}</p>
                <ul className="flex flex-col gap-3">
                  {links.map(({ label, href }) => (
                    <li key={label}>
                      <a
                        href={href}
                        className="font-sans text-sm text-gray-warm hover:text-parchment transition-colors duration-300"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8">
          <p className="font-sans text-xs text-gray-warm">© 2026 Soho Observer. All rights reserved.</p>
          <p className="font-sans text-xs text-white/25 max-w-sm text-center sm:text-right leading-relaxed">
            AI-powered identification. Results may vary. Not affiliated with any featured brands.
          </p>
        </div>

      </div>
    </footer>
  )
}
