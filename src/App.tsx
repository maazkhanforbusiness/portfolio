import { About } from './components/About'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Process } from './components/Process'
import { Services } from './components/Services'
import { Showreel } from './components/Showreel'
import { Skills } from './components/Skills'
import { Work } from './components/Work'
import './App.css'

export default function App() {
  return (
    <div className="site">
      <Nav />
      <main>
        <Hero />
        <Showreel />
        <Work />
        <Services />
        <About />
        <Experience />
        <Skills />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
