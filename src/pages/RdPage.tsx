import { Link } from 'react-router-dom'

const capabilities = [
  { num: '01', label: 'Engineering Excellence', title: 'Custom Laboratory Automation', desc: "ProScientific's bespoke liquid handling and robotic solutions are designed to scale your throughput without compromising accuracy.", items: ['Seamless LIMS Integration', 'Scalable Modular Hardware'] },
  { num: '02', label: 'Partnership', title: 'Strategic Research Alliances', desc: 'Join the ProScientific network of 200+ partner labs gaining early access to beta-stage instrumentation prototypes.', stat: 'Active Collaborations: 242', items: [] },
]

const features = [
  { icon: 'biotech', title: 'Protocol Optimization', desc: 'Our technical specialists refine instrumentation workflows to reduce reagent waste and maximize efficiency.' },
  { icon: 'verified_user', title: 'Global Compliance', desc: 'Every ProScientific solution is delivered with full validation documentation for ISO 9001 and ISO 17025 certification.' },
]

export default function RdPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="relative px-5 md:px-16 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded bg-secondary-fixed/10 border border-secondary-fixed/20">
              <span className="font-['Geist'] text-[12px] font-semibold text-secondary-fixed tracking-widest uppercase">Smart Science. Real Impact.</span>
            </div>
            <h1 className="font-['Hanken_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-white">Precision Engineering for Scientific Breakthroughs.</h1>
            <p className="text-[18px] leading-relaxed text-white/70 max-w-xl"><span className="font-bold text-white">PROSCIENTIFIC SOLUTIONS</span> partners with leading scientific institutions to engineer the future of laboratory environments with technical precision and modular infrastructure.</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/products" className="px-8 py-4 bg-secondary text-white font-['Hanken_Grotesk'] text-[20px] font-semibold rounded hover:opacity-95 transition-all">Explore Solutions</Link>
              <Link to="/contact" className="px-8 py-4 border border-white/30 text-white font-['Hanken_Grotesk'] text-[20px] font-semibold rounded hover:bg-white/10 transition-all">Technical Specs</Link>
            </div>
          </div>
          <div className="hidden lg:block relative h-[500px]">
            <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-slate-800"></div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded shadow-xl border border-outline-variant max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
                <span className="font-['Geist'] text-[14px] font-bold text-primary">ProSci Custom Build</span>
              </div>
              <p className="font-['Geist'] text-[12px] text-on-surface-variant leading-relaxed">Integrated spectral analysis array with modular liquid handling for high-throughput genomic sequencing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="py-12 px-5 md:px-16 max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold text-primary mb-4">Unrivaled Expertise by ProScientific</h2>
            <p className="text-[16px] text-on-surface-variant">Bridging the gap between standard equipment and specialized R&D needs with bespoke engineering solutions.</p>
          </div>
        </div>
        <div className="bento-grid">
          {/* Large Card */}
          <div className="col-span-12 lg:col-span-8 bg-white border border-outline-variant p-8 flex flex-col justify-between min-h-[400px] relative overflow-hidden group">
            <div className="relative z-10 max-w-md">
              <span className="font-['Geist'] text-[12px] font-semibold text-secondary mb-2 block uppercase tracking-tighter">01 / Engineering Excellence</span>
              <h3 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold text-primary mb-4">{capabilities[0].title}</h3>
              <p className="text-[16px] leading-relaxed text-on-surface-variant mb-6">{capabilities[0].desc}</p>
              <ul className="space-y-3">
                {capabilities[0].items?.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[14px] font-medium text-primary">
                    <span className="material-symbols-outlined text-secondary scale-75">check_circle</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Partnership Card */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-primary p-8 text-white flex flex-col justify-between shadow-lg">
            <div>
              <span className="font-['Geist'] text-[12px] font-semibold text-secondary-fixed mb-2 block uppercase tracking-tighter">02 / Partnership</span>
              <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold mb-4">{capabilities[1].title}</h3>
              <p className="font-['Geist'] text-[14px] opacity-80 leading-relaxed">{capabilities[1].desc}</p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-[12px] font-['Geist']">{capabilities[1].stat}</span>
              <span className="material-symbols-outlined">hub</span>
            </div>
          </div>

          {/* Feature Cards */}
          {features.map((f) => (
            <div key={f.title} className="col-span-12 md:col-span-6 lg:col-span-4 bg-white border border-outline-variant p-8 rounded-xl">
              <div className="bg-surface-container-low w-12 h-12 rounded flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary">{f.icon}</span>
              </div>
              <h4 className="font-['Hanken_Grotesk'] text-[20px] font-semibold text-primary mb-2">{f.title}</h4>
              <p className="font-['Geist'] text-[14px] text-on-surface-variant">{f.desc}</p>
            </div>
          ))}

          {/* CTA Card */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-secondary p-8 text-white">
            <div className="flex flex-col h-full justify-center text-center items-center gap-4">
              <h4 className="font-['Hanken_Grotesk'] text-[20px] font-semibold">ProSci Innovation Roadmap</h4>
              <button className="px-6 py-2 bg-white text-secondary rounded font-['Geist'] text-[14px] font-medium shadow-sm hover:bg-opacity-90">Download PDF</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="px-5 md:px-16 max-w-[1280px] mx-auto text-center">
          <h2 className="font-['Hanken_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-primary mb-8">Discuss Your Research Objectives</h2>
          <p className="text-[18px] leading-relaxed text-on-surface-variant max-w-3xl mx-auto mb-12">
            Start your transformation with a technical audit. <span className="font-bold">PROSCIENTIFIC SOLUTIONS</span> provides deep-dive consultations for global R&D excellence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="px-8 py-4 bg-primary text-white font-['Hanken_Grotesk'] text-[20px] font-semibold rounded shadow-lg hover:opacity-90 transition-all text-center">Schedule Consultation</Link>
          </div>

        </div>
      </section>
    </div>
  )
}
