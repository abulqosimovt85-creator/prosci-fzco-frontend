import type {
  BlogPost,
  Brand,
  Category,
  CaseStudy,
  Industry,
  Product,
  Service,
  Solution,
} from '../types'

export const categories: Category[] = []

export const industries: Industry[] = []

export const solutions: Solution[] = [
  {
    id: 'sol-1',
    title: 'Turnkey Lab Systems',
    description: 'Complete laboratory design, instrumentation, installation and validation for research, pharmaceuticals and industrial laboratories. We handle everything from initial concept through commissioning.',
    highlight: 'Full lab buildout',
  },
  {
    id: 'sol-2',
    title: 'Analytical Instrumentation',
    description: 'Precision instruments for chromatography, spectroscopy, mass spectrometry and elemental analysis. Sourced directly from OEM manufacturers with full warranty.',
    highlight: 'Precision analytics',
  },
  {
    id: 'sol-3',
    title: 'Laboratory Automation',
    description: 'Robotic sample handling, automated workflows and integrated data systems that eliminate manual bottlenecks and improve reproducibility.',
    highlight: 'Automation',
  },
  {
    id: 'sol-4',
    title: 'Data Integration & Compliance',
    description: 'LIMS implementation, 21 CFR Part 11 compliant systems, and data integrity solutions for regulated environments.',
    highlight: 'Compliance',
  },
]

export const services: Service[] = [
  {
    id: 'srv-1',
    title: 'Installation & Commissioning',
    description: 'Certified engineers handle site preparation, equipment delivery, installation, and performance verification — ensuring your instruments meet operational specifications from day one.',
    highlight: 'Deploy',
  },
  {
    id: 'srv-2',
    title: 'Calibration & Validation',
    description: 'IQ/OQ/PQ protocols, annual calibration services, and traceable reference standards to keep your instruments within manufacturer tolerances and regulatory requirements.',
    highlight: 'Validate',
  },
  {
    id: 'srv-3',
    title: 'Preventive Maintenance',
    description: 'Scheduled maintenance contracts (AMC) that minimize unplanned downtime. Our technicians proactively service critical components before failure.',
    highlight: 'Maintain',
  },
  {
    id: 'srv-4',
    title: 'Training & Certification',
    description: 'On-site operator training, advanced technique workshops, and competency certification programs tailored to your team and instruments.',
    highlight: 'Train',
  },
  {
    id: 'srv-5',
    title: 'Technical Support',
    description: 'Remote diagnostics, phone support, and rapid on-site response for instrument troubleshooting and emergency repairs across the UAE.',
    highlight: 'Support',
  },
]

export const brands: Brand[] = []

export const products: Product[] = []

export const caseStudies: CaseStudy[] = []

export const blogPosts: BlogPost[] = []
