import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Divider from './components/Divider'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Divider fill="#F6EFE3" />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
