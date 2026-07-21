import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full pt-12 pb-6 bg-tertiary text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-5 md:px-16 max-w-[1280px] mx-auto">
        <div className="space-y-4">
          <div className="flex items-center mb-2">
            <img
              src="/logo.svg"
              alt="PROSCIENTIFIC SOLUTIONS FZCO"
              className="h-14 w-auto object-contain brightness-0 invert"
            />
          </div>
          <p className="opacity-60 text-[16px] leading-relaxed font-['Hanken_Grotesk']">
            Precision laboratory procurement and technical lifecycle management for the global scientific community.
          </p>
          <div className="space-y-2 mt-4 text-sm opacity-80">
            <p className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              <span>IFZA Business Park, Building A1 Dubai Digital Park, Dubai Silicon Oasis, Dubai, United Arab Emirates</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">mail</span>
              <a className="hover:text-secondary-fixed transition-colors" href="mailto:info@psci-sol.com">info@psci-sol.com</a>
            </p>
            <p className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">call</span>
              <a className="hover:text-secondary-fixed transition-colors" href="tel:+971527810506">+971 52 781 0506</a>
            </p>
          </div>
        </div>

        <div>
          <h4 className="font-['Hanken_Grotesk'] text-[20px] leading-normal font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-3 opacity-80 text-[16px] leading-relaxed">
            <li><Link to="/products" className="hover:text-secondary-fixed transition-colors">Product Catalog</Link></li>
            <li><Link to="/solutions" className="hover:text-secondary-fixed transition-colors">Solutions</Link></li>
            <li><Link to="/services" className="hover:text-secondary-fixed transition-colors">Technical Support</Link></li>
            <li><Link to="/about" className="hover:text-secondary-fixed transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-secondary-fixed transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-['Hanken_Grotesk'] text-[20px] leading-normal font-semibold mb-6">Company</h4>
          <ul className="space-y-3 text-[16px] leading-relaxed">
            <li className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">Privacy Policy</li>
            <li className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">Terms of Service</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-white/5 pt-6 px-5 md:px-16 max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-['Geist'] text-[12px] font-semibold opacity-60">
          &copy; 2024 PROSCIENTIFIC SOLUTIONS FZCO. All rights reserved. ISO 9001:2015 Certified.
        </p>
      </div>
    </footer>
  )
}
