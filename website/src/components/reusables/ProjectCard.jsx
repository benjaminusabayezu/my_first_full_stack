import { motion } from "framer-motion";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 hover:border-lime-400 transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* status badge */}
        <span
          className={`absolute top-3 right-3 text-[10px] px-2 py-1 rounded-full font-medium
          ${
            project.status === "Completed"
              ? "bg-lime-400/20 text-lime-400"
              : project.status === "Ongoing"
                ? "bg-blue-400/20 text-blue-400"
                : "bg-zinc-700 text-zinc-300"
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="text-white font-semibold text-lg">{project.title}</h3>

        <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
          {project.description}
        </p>

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((t, i) => (
            <span
              key={i}
              className="text-[11px] px-2 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-lime-300"
            >
              {t}
            </span>
          ))}
        </div>

        {/* BUTTON */}
        <a
          href={project.link}
          className="inline-block mt-5 text-sm text-lime-400 hover:text-lime-300 transition"
        >
          View Project →
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
