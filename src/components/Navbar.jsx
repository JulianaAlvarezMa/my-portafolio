export default function Navbar() {
  return (
    <header className="navbar">
      <a href="#hero" className="navbar-logo">Juliana Alvarez</a>
      <nav className="navbar-links">
        <a href="#about">Sobre mi</a>
        <a href="#projects">Proyectos</a>
        <a href="#contact">Contacto</a>
      </nav>
      <a href="#contact" className="btn btn-primary navbar-cta">Contactarme</a>
    </header>
  )
}
