import { projects } from '../data/projects'
import ScrollFillTitle from './ScrollFillTitle'

const PEEK = 64 // px de "pestaña" que queda visible de cada tarjeta anterior

function ProjectTab({ project, index }) {
  return (
    <div
      className="project-tab"
      style={{ top: `${index * PEEK}px`, zIndex: index + 1, background: project.bg }}
    >
      <div className="project-tab-inner">
        <div className="project-tab-head">
          <span className="project-tab-number">{project.number}</span>
          <span className="project-tab-client">{project.client}</span>
        </div>
        <div className="project-tab-grid">
          <div
            className="project-tab-main"
            style={{ background: project.main ? `url(${project.main}) center/cover` : project.mainColor }}
          />
          <div className="project-tab-side">
            <div style={{ background: project.side1 ? `url(${project.side1}) center/cover` : project.side1Color }} />
            <div style={{ background: project.side2 ? `url(${project.side2}) center/cover` : project.side2Color }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects-title-wrap">
        <ScrollFillTitle text="Proyectos" className="projects-title" />
      </div>
      <div className="projects-track">
        {projects.map((p, i) => (
          <ProjectTab key={p.number} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
