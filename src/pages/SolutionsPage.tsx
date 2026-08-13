import { Link } from 'react-router-dom'
import { solutions } from '../data/content'

const solutionIcons = ['precision_manufacturing', 'biotech', 'smart_toy', 'cloud_sync']

export default function SolutionsPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative py-12 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 relative z-10">
          <div className="max-w-3xl">
            <span className="font-['Geist'] text-[14px] font-medium text-secondary uppercase tracking-widest mb-4 block">Solutions</span>
            <h1 className="font-['Hanken_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-primary mb-6">Solutions for every lab need</h1>
            <p className="text-[18px] leading-relaxed text-on-surface-variant">Turnkey laboratory systems, automation and engineering services for high-performance scientific workflows.</p>
          </div>
        </div>
      </section>

      {/* Solution Cards */}
      <section className="py-12 max-w-[1280px] mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution, i) => (
            <div key={solution.id} className="bg-white border border-outline-variant p-8 hover:shadow-lg transition-shadow group">
              <div className="flex items-start gap-6">
                <div className="shrink-0 w-14 h-14 bg-primary text-white flex items-center justify-center rounded-lg">
                  <span className="material-symbols-outlined text-[28px]">{solutionIcons[i]}</span>
                </div>
                <div className="flex-1">
                  <span className="font-['Geist'] text-[12px] font-bold text-secondary uppercase tracking-widest">{solution.highlight}</span>
                  <h2 className="font-['Hanken_Grotesk'] text-[24px] font-semibold text-primary mt-2 mb-3">{solution.title}</h2>
                  <p className="text-[15px] leading-relaxed text-on-surface-variant">{solution.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="text-center mb-12">
            <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold mb-4">How We Deliver</h2>
            <p className="text-[16px] opacity-80 max-w-2xl mx-auto">Our structured approach ensures every project meets technical specifications, budget, and timeline requirements.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Assess', desc: 'Site survey, workflow analysis, and technical requirements gathering.', icon: 'search' },
              { step: '02', title: 'Design', desc: 'Custom lab layout, equipment selection, and integration planning.', icon: 'architecture' },
              { step: '03', title: 'Build', desc: 'Installation, commissioning, and performance qualification.', icon: 'construction' },
              { step: '04', title: 'Support', desc: 'Ongoing maintenance, calibration, and technical assistance.', icon: 'support_agent' },
            ].map((item) => (
              <div key={item.step} className="text-center p-6 border border-white/10 rounded-lg">
                <span className="material-symbols-outlined text-secondary-fixed text-[32px] mb-4">{item.icon}</span>
                <div className="font-['Geist'] text-[12px] font-bold text-secondary-fixed uppercase tracking-widest mb-2">Step {item.step}</div>
                <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold mb-2">{item.title}</h3>
                <p className="text-[14px] opacity-70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="py-12 max-w-[1280px] mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-primary p-8 text-white rounded-lg">
            <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold mb-6">Why ProScient</h3>
            <ul className="space-y-4">
              {[
                'Direct partnerships with 150+ global manufacturers',
                'ISO 9001:2015 certified quality management',
                'Local UAE inventory for faster delivery',
                'Dedicated project managers for complex builds',
                'Full lifecycle support — from design to decommission',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px] mt-0.5">check_circle</span>
                  <span className="text-[15px] opacity-90">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-outline-variant p-8">
            <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold text-primary mb-6">Industries We Serve</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: 'medication', name: 'Pharmaceutical' },
                { icon: 'science', name: 'Biotechnology' },
                { icon: 'school', name: 'Academic Research' },
                { icon: 'oil_barrel', name: 'Oil & Gas' },
                { icon: 'restaurant', name: 'Food & Beverage' },
                { icon: 'eco', name: 'Environmental' },
              ].map((industry) => (
                <div key={industry.name} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-lg">
                  <span className="material-symbols-outlined text-primary text-[20px]">{industry.icon}</span>
                  <span className="font-['Geist'] text-[14px] font-medium text-primary">{industry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center bg-white">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold text-primary mb-6">Start your lab project today</h2>
          <p className="text-[16px] leading-relaxed text-on-surface-variant mb-8">Speak with our technical specialists at <span className="font-bold">PROSCIENTIFIC SOLUTIONS</span> to build a solution tailored to your research goals.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link to="/contact" className="bg-primary text-white px-10 py-4 font-['Geist'] text-[14px] font-bold uppercase tracking-wide hover:bg-primary-container transition-colors text-center">Request a Consultation</Link>
            <Link to="/catalog" className="border border-primary text-primary px-10 py-4 font-['Geist'] text-[14px] font-bold uppercase tracking-wide hover:bg-surface-container-low transition-colors text-center">Browse Catalog</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
