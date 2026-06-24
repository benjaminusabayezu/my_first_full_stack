import React from "react";
import {
  House,
  Info,
  NotepadText,
  FolderRoot,
  Dumbbell,
  Contact,
  Mail,
  MapPin,
} from "lucide-react";

// Static data lives outside the component so it isn't recreated on every render.
const FOOTER_LINKS = [
  { name: "Home", href: "#home", icon: House },
  { name: "About", href: "#about", icon: Info },
  { name: "Skills", href: "#skills", icon: NotepadText },
  { name: "Projects", href: "#projects", icon: FolderRoot },
  { name: "Experience", href: "#experience", icon: Dumbbell },
  { name: "Contact", href: "#contact", icon: Contact },
];

const FOOTER_SERVICES = [
  "Frontend Development",
  "React Applications",
  "Web Application Testing",
  "Responsive Design",
  "UI Implementation",
];

const FOOTER_TECHNOLOGIES = [
  "React",
  "JavaScript",
  "Tailwind CSS",
  "Django",
  "PostgreSQL",
];

const FOOTER_CONTACT = [
  {
    value: "benjamin96usab@gmail.com",
    icon: Mail,
    href: "mailto:benjamin96usab@gmail.com",
  },
  {
    value: "Kigali, Rwanda",
    icon: MapPin,
    href: "https://maps.google.com/?q=Kigali,Rwanda",
  },
];

const navLinkClasses =
  "flex items-center gap-3 p-2 text-sm rounded-lg text-zinc-400 hover:bg-lime-900/40 hover:text-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 transition-colors duration-300";

const contactLinkClasses =
  "flex items-center gap-3 p-2 text-sm rounded-lg text-lime-500 hover:bg-lime-900/40 hover:text-lime-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-400 transition-colors duration-300";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-lime-950 text-zinc-300">
      {/* Decorative wave divider - sits in normal flow, no absolute positioning */}
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="block w-full h-12 sm:h-16 lg:h-20"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          className="fill-lime-950"
        />
      </svg>

      <div className="grid grid-cols-1 gap-10 px-6 py-10 sm:px-10 md:grid-cols-2 lg:grid-cols-4 lg:px-20">
        {/* Training Areas */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="text-2xl font-bold text-lime-400">Training Areas</h3>
          <ul>
            {FOOTER_SERVICES.map((service) => (
              <li key={service} className="py-1 text-zinc-400">
                {service}
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h3 className="text-2xl font-bold text-lime-400">Technologies</h3>
          <ul>
            {FOOTER_TECHNOLOGIES.map((technology) => (
              <li key={technology} className="py-1 text-zinc-400">
                {technology}
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-2xl font-bold text-lime-400">Quick Links</h3>
          <ul className="w-full max-w-[200px]">
            {FOOTER_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <a href={link.href} className={navLinkClasses}>
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{link.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-2xl font-bold text-lime-400">Get In Touch</h3>
          <ul className="w-full max-w-[260px]">
            {FOOTER_CONTACT.map((contact) => {
              const Icon = contact.icon;
              const isExternal = contact.href.startsWith("http");
              return (
                <li key={contact.value}>
                  <a
                    href={contact.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className={contactLinkClasses}
                  >
                    <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="break-all">{contact.value}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-lime-900 px-6 py-4 text-center font-mono text-sm text-zinc-400 sm:text-base">
        <p>&copy; {year} My Internship</p>
      </div>
    </footer>
  );
};

export default Footer;
