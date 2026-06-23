import { Link } from 'react-router-dom'

const links = [
  { title: 'Products', href: '/products' },
  { title: 'Solutions', href: '/solutions' },
  { title: 'Services', href: '/services' },
  { title: 'Industries', href: '/industries' },
  { title: 'Insights', href: '/insights' },
  { title: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-14 md:px-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4 lg:max-w-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">ProScient</p>
          <p className="text-lg font-semibold text-white">Smart science. Real impact.</p>
          <p className="text-sm leading-7 text-slate-400">
            Enterprise laboratory automation, analytical technologies and scientific services for UAE and regional partners.
          </p>
          <div className="text-xs text-slate-400 space-y-1.5 pt-2">
            <p className="flex items-center gap-2">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Email:</span>
              <a href="mailto:info@psci-sol.com" className="text-slate-300 hover:text-white transition">info@psci-sol.com</a>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">Phone:</span>
              <a href="tel:+971527810506" className="text-slate-300 hover:text-white transition">+971 52 781 0506</a>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          {links.map(link => (
            <Link key={link.href} to={link.href} className="text-sm text-slate-300 hover:text-white">
              {link.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-800 px-6 py-5 text-sm text-slate-500 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 sm:flex-row sm:justify-between">
          <p>© 2026 ProScientific Solutions - FZCO. All rights reserved.</p>
          <p>Built for B2B science, lead generation, and premium laboratory transformation.</p>
        </div>
      </div>
    </footer>
  )
}
