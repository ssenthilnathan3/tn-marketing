import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { BentoDemo } from './components/website/bento'
import { Contact } from './components/website/contact'
import { FAQ } from './components/website/faq'
import { Footer } from './components/website/footer'
import { GlobeSection } from './components/website/globe-section'
import { Hero } from './components/website/hero'
import { TrendGraph } from './components/website/hero-chart'
import { Navbar } from './components/website/navbar'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <Hero />
      <TrendGraph />
      <BentoDemo />
      <GlobeSection />
      <FAQ />
      <Contact />
      <Footer />
    </ThemeProvider>
  )
}

export default App
