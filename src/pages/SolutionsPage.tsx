import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function SolutionsPage() {
  return (
    <div className="bg-background">
      <Helmet>
        <title>Laboratory Solutions — ProScientific Solutions</title>
        <meta name="description" content="Turnkey laboratory systems, analytical instrumentation, automation, and engineering services for science, industry, and research." />
      </Helmet>
      {/* Hero */}
      <section className="relative py-12 bg-white overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16 relative z-10">
          <div className="max-w-3xl">
            <h1 className="font-['Hanken_Grotesk'] text-[48px] leading-[1.1] tracking-[-0.02em] font-bold text-primary mb-6">Laboratory Solutions for Science, Industry & Research</h1>
            <p className="text-[18px] leading-relaxed text-on-surface-variant mb-8">From individual instruments to complete laboratory setups, <span className="font-bold">PROSCIENTIFIC SOLUTIONS</span> provides reliable solutions tailored to your technical requirements, workflow, and budget.</p>
            <Link to="/contact" className="inline-block bg-primary text-white px-10 py-4 font-['Geist'] text-[14px] font-bold uppercase tracking-wide hover:bg-primary-container transition-colors">Discuss Your Laboratory Needs</Link>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-12 max-w-[1280px] mx-auto px-5 md:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold text-primary mb-4">What We Do</h2>
            <p className="text-[16px] leading-relaxed text-on-surface-variant mb-6">We provide comprehensive laboratory solutions, from initial planning and equipment selection to installation, training, and ongoing technical support.</p>
          </div>
          <div>
            <ul className="space-y-3">
              {[
                'Laboratory planning and design',
                'Equipment selection and specification',
                'Complete laboratory equipment supply',
                'Installation and commissioning',
                'Calibration and validation',
                'User training',
                'Maintenance and technical support',
                'Spare parts and consumables',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5">check_circle</span>
                  <span className="text-[15px] text-on-surface-variant">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Solutions by Application */}
      <section className="py-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold text-primary mb-8">Solutions by Application</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: 'biotech', title: 'Analytical Laboratories', desc: 'Precision instruments and analytical equipment for accurate testing, measurement, and quality control.' },
              { icon: 'science', title: 'Research & Development', desc: 'Flexible laboratory solutions designed for universities, research centers, and R&D facilities.' },
              { icon: 'factory', title: 'Industrial & Quality Control', desc: 'Reliable equipment for production control, material testing, process monitoring, and quality assurance.' },
              { icon: 'eco', title: 'Environmental Laboratories', desc: 'Solutions for water, soil, air, and environmental monitoring and analysis.' },
              { icon: 'agriculture', title: 'Food & Agriculture', desc: 'Laboratory equipment for food safety, agricultural analysis, quality control, and research.' },
              { icon: 'medication', title: 'Pharmaceutical & Chemical', desc: 'Controlled and precise laboratory solutions for pharmaceutical, chemical, and related applications.' },
            ].map((item) => (
              <div key={item.title} className="bg-background border border-outline-variant p-8 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary text-white flex items-center justify-center rounded-lg mb-4">
                  <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                </div>
                <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold text-primary mb-3">{item.title}</h3>
                <p className="text-[14px] leading-relaxed text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process — From Requirement to Results */}
      <section className="py-12 bg-primary text-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold mb-8 text-center">From Requirement to Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { step: '01', title: 'Consultation', desc: 'We understand your application, workflow, technical requirements, and budget.' },
              { step: '02', title: 'Solution Design', desc: 'Our specialists select suitable instruments and develop an optimized equipment configuration for your laboratory.' },
              { step: '03', title: 'Supply & Installation', desc: 'We coordinate equipment delivery, installation, setup, and commissioning.' },
              { step: '04', title: 'Training', desc: 'We train your personnel to operate the equipment correctly, safely, and efficiently.' },
              { step: '05', title: 'Support', desc: 'Our technical team provides ongoing service, maintenance, spare parts, and technical assistance.' },
            ].map((item) => (
              <div key={item.step} className="text-center p-6 border border-white/10 rounded-lg">
                <div className="font-['Geist'] text-[12px] font-bold text-secondary-fixed uppercase tracking-widest mb-2">Step {item.step}</div>
                <h3 className="font-['Hanken_Grotesk'] text-[20px] font-semibold mb-3">{item.title}</h3>
                <p className="text-[14px] opacity-70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Laboratory Solutions */}
      <section className="py-12 max-w-[1280px] mx-auto px-5 md:px-16">
        <div className="bg-white border border-outline-variant p-10 md:p-16 text-center">
          <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold text-primary mb-6">Complete Laboratory Solutions</h2>
          <p className="text-[16px] leading-relaxed text-on-surface-variant max-w-3xl mx-auto mb-8">Whether you need a single analytical instrument or a fully equipped laboratory, <span className="font-bold">PROSCIENTIFIC SOLUTIONS</span> can coordinate the complete project — equipment selection, supply, installation, commissioning, and technical support.</p>
          <Link to="/contact" className="inline-block bg-primary text-white px-10 py-4 font-['Geist'] text-[14px] font-bold uppercase tracking-wide hover:bg-primary-container transition-colors">Start Your Project</Link>
        </div>
      </section>

      {/* Solutions by Laboratory Type */}
      <section className="py-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-5 md:px-16">
          <h2 className="font-['Hanken_Grotesk'] text-[32px] leading-[1.2] font-semibold text-primary mb-8">Solutions by Laboratory Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              'Universities & Educational Laboratories',
              'Research Institutes',
              'Industrial Laboratories',
              'Quality Control Laboratories',
              'Environmental Laboratories',
              'Clinical & Diagnostic Laboratories',
              'Food Testing Laboratories',
              'Pharmaceutical Laboratories',
              'Geological & Mining Laboratories',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 bg-surface-container-low border border-outline-variant">
                <span className="material-symbols-outlined text-primary text-[20px]">lab_research</span>
                <span className="font-['Geist'] text-[14px] font-medium text-primary">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
