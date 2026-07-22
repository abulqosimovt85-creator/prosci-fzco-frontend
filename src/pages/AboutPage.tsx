export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative py-12 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 relative z-10">
          <div className="max-w-3xl">
            <span className="font-['Geist'] text-[14px] font-medium text-secondary uppercase tracking-widest mb-4 block">Smart Science. Real Impact.</span>
            <h1 className="font-['Hanken_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-primary mb-6">Empowering Scientific Discovery through Seamless Logistics.</h1>
            <p className="text-[18px] leading-relaxed text-on-surface-variant">ProScientific Solutions is a global leader in high-precision laboratory equipment and supply chain solutions, serving the world's most advanced research facilities with technical authority and uncompromising reliability.</p>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-12 max-w-[1280px] mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-white border border-outline-variant p-8 flex flex-col justify-between hover:shadow-lg transition-shadow">
            <div>
              <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold text-primary mb-4">Our Mission</h2>
              <p className="text-[16px] leading-relaxed text-on-surface-variant max-w-2xl">At ProScientific Solutions, we aim to bridge the gap between breakthrough research and logistical complexity. We provide the infrastructure, technical support, and precision instruments that enable scientists to focus on what matters most: solving the world's greatest challenges.</p>
            </div>
            <div className="mt-6 flex gap-12">
              <div>
                <div className="text-[32px] leading-[1.2] font-bold text-primary">150+</div>
                <div className="text-[14px] font-medium text-on-surface-variant uppercase">Global Partners</div>
              </div>
              <div>
                <div className="text-[32px] leading-[1.2] font-bold text-primary">24/7</div>
                <div className="text-[14px] font-medium text-on-surface-variant uppercase">Technical Support</div>
              </div>
              <div>
                <div className="text-[32px] leading-[1.2] font-bold text-primary">12k</div>
                <div className="text-[14px] font-medium text-on-surface-variant uppercase">Products Cataloged</div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 bg-primary p-8 text-white">
            <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold mb-6">Our Values</h3>
            <ul className="space-y-6">
              {[
                { icon: 'verified_user', title: 'Technical Integrity', desc: 'ProScientific Solutions ensures uncompromising accuracy in every technical spec we provide.' },
                { icon: 'speed', title: 'Operational Velocity', desc: 'Streamlined procurement paths to accelerate time-to-discovery.' },
                { icon: 'hub', title: 'Reliable Connectivity', desc: 'A resilient global supply chain that scientists can trust.' },
              ].map((v) => (
                <li key={v.title} className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-secondary-fixed">{v.icon}</span>
                  <div>
                    <span className="block font-bold mb-1">{v.title}</span>
                    <span className="text-[14px] opacity-80">{v.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Leadership - commented out per client request
      <section className="py-12 bg-surface-container-low">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="mb-8 text-center">
            <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold text-primary">Architects of Precision</h2>
            <p className="text-[16px] text-on-surface-variant">Guided by decades of expertise in scientific supply chains and laboratory management.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: 'Dr. Alistair Thorne', role: 'Chief Executive Officer', desc: 'Former Research Director with 25 years in biotech procurement and infrastructure optimization.' },
              { name: 'Elena Rodriguez', role: 'Head of Global Operations', desc: 'Expert in international logistics and ISO compliance within the scientific manufacturing sector.' },
              { name: 'Markus Vogel', role: 'Technical Director', desc: 'Specializing in analytical instrumentation and emerging laboratory hardware standards.' },
              { name: 'Sarah Chen', role: 'Chief Financial Officer', desc: 'Strategist for sustainable growth and long-term procurement partnerships for enterprise research.' },
            ].map((m) => (
              <div key={m.name} className="group">
                <div className="aspect-square bg-surface-container-highest overflow-hidden mb-4 border border-outline-variant">
                  <div className="w-full h-full flex items-center justify-center text-outline">
                    <span className="material-symbols-outlined text-[80px]">person</span>
                  </div>
                </div>
                <h4 className="font-['Hanken_Grotesk'] text-[20px] font-semibold text-primary">{m.name}</h4>
                <p className="text-[14px] font-medium text-secondary uppercase mb-2">{m.role}</p>
                <p className="text-[14px] text-on-surface-variant leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      */}

      {/* Certifications */}
      <section className="py-12">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <div className="flex flex-col md:flex-row items-center gap-12 p-12 border border-outline-variant bg-white">
            <div className="flex-1">
              <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold text-primary mb-4">Certified for Excellence</h2>
              <p className="text-[16px] leading-relaxed text-on-surface-variant mb-8">ProScientific Solutions maintains the highest standards of quality management and environmental responsibility. Our operations are audited annually to ensure absolute compliance with global scientific and industrial regulations.</p>
              <div className="flex flex-wrap gap-8">
                {['ISO 9001:2015', 'ISO 14001', 'OHSAS 18001'].map((cert) => (
                  <div key={cert} className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center bg-surface-container-low rounded border border-outline-variant">
                      <span className="material-symbols-outlined text-primary">verified</span>
                    </div>
                    <span className="font-['Geist'] text-[14px] font-medium text-primary">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="p-8 border-4 border-primary/10 rounded-full">
                <div className="w-32 h-32 flex items-center justify-center rounded-full bg-primary text-white">
                  <span className="material-symbols-outlined text-[64px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global HQ */}
      <section className="py-12 bg-primary text-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4">
            <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold mb-6">Global Headquarters</h2>
            <p className="text-[16px] leading-relaxed opacity-80 mb-10">Strategically based in Dubai, we provide regional expertise with global reach. Our headquarters at Dubai Silicon Oasis serves as our central hub for logistics, technical support, and mission-critical component distribution.</p>
            <div className="flex items-start gap-4 p-4 rounded bg-white/5 border border-white/10">
              <span className="material-symbols-outlined text-secondary-fixed">location_on</span>
              <div>
                <h5 className="font-bold">Dubai Headquarters</h5>
                <p className="text-[14px] opacity-60">IFZA Business Park, Building A1 Dubai Digital Park, Dubai Silicon Oasis, Dubai, UAE</p>
              </div>
            </div>
          </div>
          <div className="md:col-span-8 relative min-h-[400px]">
            <div className="absolute inset-0 bg-primary-container rounded-xl overflow-hidden shadow-2xl">
              <div className="w-full h-full opacity-30 mix-blend-overlay bg-slate-800"></div>
              <div className="absolute top-[48%] left-[58%] w-4 h-4 bg-secondary-fixed rounded-full animate-pulse shadow-[0_0_15px_rgba(107,248,238,0.8)]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 text-center bg-white">
        <div className="max-w-3xl mx-auto px-5">
          <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold text-primary mb-6">Ready to optimize your facility?</h2>
          <p className="text-[16px] leading-relaxed text-on-surface-variant mb-8">Speak with our technical specialists at ProScientific Solutions to build a procurement strategy tailored to your lab's specific research goals.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a href="/contact" className="bg-primary text-white px-10 py-4 font-['Geist'] text-[14px] font-bold uppercase tracking-wide hover:bg-primary-container transition-colors text-center">Contact Sales</a>
            <button className="border border-primary text-primary px-10 py-4 font-['Geist'] text-[14px] font-bold uppercase tracking-wide hover:bg-surface-container-low transition-colors">Download Capability Statement</button>
          </div>
        </div>
      </section>
    </div>
  )
}
