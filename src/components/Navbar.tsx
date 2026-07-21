import { Link, NavLink } from 'react-router-dom'

const navigation = [
  { name: 'Catalog', path: '/products' },
  { name: 'Solutions', path: '/solutions' },
  { name: 'Technical Support', path: '/services' },
  { name: 'About Us', path: '/about' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full z-50 bg-white border-b border-outline-variant shadow-sm">
      <div className="flex items-center justify-between px-5 md:px-16 py-3 max-w-[1280px] mx-auto">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="/logo.svg"
            alt="PROSCIENTIFIC SOLUTIONS FZCO"
            className="h-14 w-auto object-contain"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `font-['Geist'] text-[14px] leading-none tracking-[0.02em] font-medium transition-colors ${
                  isActive
                    ? 'text-primary border-b-2 border-primary pb-1 font-semibold'
                    : 'text-on-surface-variant hover:text-primary'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/admin/login"
            className="hidden md:block font-['Geist'] text-[14px] leading-none tracking-[0.02em] font-medium text-on-surface-variant hover:text-primary transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/contact"
            className="bg-primary text-white px-6 py-2 font-['Geist'] text-[14px] leading-none tracking-[0.02em] font-semibold rounded-lg hover:bg-primary-container transition-all"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </nav>
  )
}
