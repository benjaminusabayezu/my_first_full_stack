// components/admin/AdminSidebar.jsx

import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  Rocket,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    name: "Courses",
    icon: BookOpen,
    path: "/admin/courses",
  },
  {
    name: "Students",
    icon: Users,
    path: "/admin/students",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/admin/settings",
  },
];

export default function AdminSidebar() {
  return (
    <aside className="w-60 bg-zinc-950 text-zinc-400 border-r border-zinc-700">
      <div className="p-6 border-b border-zinc-800 mb-4">
        <h1 className="text-3xl font-black text-lime-600 animate-modal delay-100">
          <span className="text-yellow-500">B</span>EN .
          <span
            className="
        bg-linear-to-r from-yellow-500"
          >
            ViS<span className="text-2xl text-zinc-300">UAL</span>
          </span>
        </h1>
      </div>

      <nav className="px-4">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex text-sm items-center gap-3 px-4 py-3 rounded-lg hover:scale-90
               hover:bg-zinc-900 transition-all duration-300 hover:text-zinc-300 animate-modal delay-200"
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      <div className="h-30 bg-linear-to-t from-yellow-500 to-zinc-950 m-5 rounded-lg p-4 items-center justify-center text-center">
        <p className="px-4 py-2 text-sm text-white">
          Basic dashboard to <b>Pro</b>
          <button
            className="w-full flex gap-1 font-bold 
  hover:cursor-pointer hover:bg-lime-500 text-white transition-all duration-300 hover:scale-90
  items-center justify-center px-3 py-2 bg-yellow-600 rounded-2xl mt-2"
          >
            <span className="">Upgrade</span>
            <Rocket className="w-3 h-3" />
          </button>
        </p>

        <button
          className="mt-6 px-4 py-2 gap-2 
 cursor-pointer hover:border-red-400 transition-all duration-300 hover:text-red-400
 hover:scale-102 border-t w-full flex items-center justify-center font-bold"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>

        <p className="text-xs text-zinc-800 m-4 p-2">Version: V1.0.0
            <br />
            &copy; BenVisual
        </p>

      </div>

    </aside>
  );
}
