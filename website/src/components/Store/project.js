import img1 from '../../assets/projects/project-01.png'
import img2 from "../../assets/projects/project-02.png";
import img3 from "../../assets/projects/project-3.png";

export const PROJECTS = [
  {
    title: "Inventory Management System",
    description:
      "Full-stack system for managing stock, sales, and reports with authentication.",
    image: img1,
    tech: ["React", "Django", "PostgreSQL"],
    status: "Completed",
    link: "#",
  },
  {
    title: "Portfolio Website",
    description:
      "Modern animated portfolio built with React, Tailwind, and Framer Motion.",
    image: img2,
    tech: ["React", "Tailwind", "Framer Motion"],
    status: "In Progress",
    link: "#",
  },
  {
    title: "Testing Dashboard",
    description:
      "UI testing system for checking responsiveness, validation, and login security.",
    image: img3,
    tech: ["React", "Testing", "UI/UX"],
    status: "Ongoing",
    link: "#",
  },
];
