import ProjectCard from "./reusables/ProjectCard";
import {PROJECTS} from './Store/project'

const Activities = () => {
  return (
    <section
      id="activities"
      className="min-h-screen py-20 px-6 md:px-16 bg-gradient-to-b from-black via-zinc-950 to-black"
    >
      {/* TITLE */}
      <h1 className="text-3xl md:text-4xl font-bold text-center text-lime-400 mb-14">
        Activities / Projects
      </h1>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Activities;
