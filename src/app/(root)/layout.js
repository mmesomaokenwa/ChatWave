import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'

const RootLayout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default RootLayout