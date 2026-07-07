import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Quotes from '../components/Quotes'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Quotes />
      </main>
      <Footer />
    </>
  )
}
