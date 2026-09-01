import Image from "next/image";
import { getFeaturedProjects } from "@/data/projects";

export default function ProjectsSection() {
  const projects = getFeaturedProjects();

  return (
    <section id="projects" className="py-20 lg:py-32 border-b border-line" aria-labelledby="projects-heading">
      <div className="container-editorial mb-16">
        <p className="eyebrow mb-4">Student Work</p>
        <h2 id="projects-heading" className="display-lg">
          Built by
          <br />
          Students.
        </h2>
      </div>

      <div className="space-y-0">
        {projects.map((project, i) => {
          const reversed = i % 2 === 1;
          return (
            <article
              key={project.id}
              className="border-t border-line last:border-b"
            >
              <div className="container-editorial py-12 lg:py-20">
                <div className={`grid-12 items-center gap-y-8 ${reversed ? "" : ""}`}>
                  <div
                    className={`col-span-4 md:col-span-7 relative aspect-[16/10] bg-paper ${
                      reversed ? "md:col-start-6 md:order-2" : ""
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 60vw"
                    />
                  </div>

                  <div
                    className={`col-span-4 md:col-span-4 flex flex-col justify-center ${
                      reversed ? "md:col-start-1 md:row-start-1" : "md:col-start-9"
                    }`}
                  >
                    <p className="eyebrow mb-3">{project.chapter}</p>
                    <h3 className="text-2xl sm:text-3xl font-bold text-ink leading-tight mb-4">
                      {project.title}
                    </h3>
                    <p className="text-sm text-graphite mb-2">
                      {project.students.join(" · ")}
                    </p>
                    <div className="flex flex-wrap gap-2 my-4">
                      {project.technology.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] uppercase tracking-[0.12em] text-stone"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {project.achievement && (
                      <p className="text-sm text-ink font-medium mb-6 border-l-2 border-ieee pl-4">
                        {project.achievement}
                      </p>
                    )}
                    <div className="flex gap-6">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="link-arrow">
                          GitHub →
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="link-arrow">
                          Demo →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
