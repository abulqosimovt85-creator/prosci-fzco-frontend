import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center px-5">
          <div className="max-w-lg text-center">
            <span className="material-symbols-outlined text-[64px] text-primary mb-4">error</span>
            <h1 className="font-['Hanken_Grotesk'] text-[32px] font-bold text-primary mb-4">Something went wrong</h1>
            <p className="text-[16px] text-on-surface-variant mb-8">An unexpected error occurred. Please try refreshing the page or contact our support team.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => { this.setState({ hasError: false }); window.location.href = '/' }}
                className="bg-primary text-white px-8 py-4 font-['Geist'] text-[14px] font-bold uppercase tracking-wide hover:bg-primary-container transition-colors"
              >
                Go Home
              </button>
              <button
                onClick={() => window.location.reload()}
                className="border border-primary text-primary px-8 py-4 font-['Geist'] text-[14px] font-bold uppercase tracking-wide hover:bg-surface-container-low transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
