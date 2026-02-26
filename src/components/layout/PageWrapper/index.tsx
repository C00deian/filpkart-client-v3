import Header from '../Header'
import Footer from '../Footer'

interface PageWrapperProps {
  children: React.ReactNode
  fullWidth?: boolean
}

const PageWrapper = ({ children, fullWidth = false }: PageWrapperProps) => (
  <div className="min-h-screen flex flex-col bg-bg-light">
    <Header />
    <main className={`flex-1 ${fullWidth ? 'w-full' : 'max-w-[1200px] mx-auto w-full px-4 py-4'}`}>
      {children}
    </main>
    <Footer />
  </div>
)
export default PageWrapper
