export default function Footer() {
  return (
    <footer className="w-full pt-12 pb-6 bg-tertiary text-white">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-5 md:px-16 max-w-[1280px] mx-auto">
        <div className="space-y-4">
          <div className="flex items-center mb-2">
            <img
              src="/logo.svg"
              alt="PROSCIENTIFIC SOLUTIONS FZCO"
              className="h-10 w-auto object-contain brightness-0 invert"
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
          <h4 className="font-['Hanken_Grotesk'] text-[20px] leading-normal font-semibold mb-6">Product Catalog</h4>
          <ul className="space-y-3 opacity-80 text-[16px] leading-relaxed">
            <li className="hover:text-secondary-fixed transition-colors cursor-pointer">Centrifuges</li>
            <li className="hover:text-secondary-fixed transition-colors cursor-pointer">Spectrometers</li>
            <li className="hover:text-secondary-fixed transition-colors cursor-pointer">Lab Furniture</li>
            <li className="hover:text-secondary-fixed transition-colors cursor-pointer">Cold Storage</li>
            <li className="hover:text-secondary-fixed transition-colors cursor-pointer">Sterilization</li>
          </ul>
        </div>

        <div>
          <h4 className="font-['Hanken_Grotesk'] text-[20px] leading-normal font-semibold mb-6">Our Solutions</h4>
          <ul className="space-y-3 opacity-80 text-[16px] leading-relaxed">
            <li className="hover:text-secondary-fixed transition-colors cursor-pointer">Lab Design</li>
            <li className="hover:text-secondary-fixed transition-colors cursor-pointer">Equipment Leasing</li>
            <li className="hover:text-secondary-fixed transition-colors cursor-pointer">Calibration Services</li>
            <li className="hover:text-secondary-fixed transition-colors cursor-pointer">Asset Recovery</li>
            <li className="hover:text-secondary-fixed transition-colors cursor-pointer">Global Logistics</li>
          </ul>
        </div>

        <div>
          <h4 className="font-['Hanken_Grotesk'] text-[20px] leading-normal font-semibold mb-6">Company</h4>
          <ul className="space-y-3 text-[16px] leading-relaxed">
            <li className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">Compliance</li>
            <li className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">Global Locations</li>
            <li className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">Privacy Policy</li>
            <li className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">Sustainability</li>
            <li className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">Supplier Portal</li>
            <li className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer">Careers</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 border-t border-white/5 pt-6 px-5 md:px-16 max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-['Geist'] text-[12px] font-semibold opacity-60">
          &copy; 2024 PROSCIENTIFIC SOLUTIONS FZCO. All rights reserved. ISO 9001:2015 Certified.
        </p>
        <div className="flex gap-6 font-['Geist'] text-[12px] font-semibold">
          <span className="opacity-60 hover:opacity-100 cursor-pointer">Terms of Service</span>
          <span className="opacity-60 hover:opacity-100 cursor-pointer">Cookie Policy</span>
        </div>
      </div>
    </footer>
  )
}
