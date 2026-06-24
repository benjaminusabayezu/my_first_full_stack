import { useState } from "react";
import {
  Menu,
  Search,
  Video,
  UserCircle2,
  LogOut,
  Settings,
  Bell,
  ChevronDown,
  HeartPlus,
  Info,
} from "lucide-react";
import defaultImage from '../../assets/default_profile.png';

import VideoSection from "../video_page/VideoSection";

const AdminNavbar = ({ onToggleSidebar }) => {

    const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [search, setSearch] = useState("");

  const user = JSON.parse(localStorage.getItem("user")) || {
    username: "none",
    email: "none@admin.com",
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search:", search);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/20 backdrop-blur shadow-lg">
      <div className="flex items-center justify-between gap-4 px-4 py-3 md:px-6 animate-modal">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border bg-zinc-900 text-zinc-700 shadow-sm transition hover:bg-zinc-800 md:hidden"
            aria-label="Toggle menu"
          >
            {<Menu className="w-4 h-4" />}
          </button>

          <div className="hidden md:block">
            <h1 className="text-lg font-semibold text-yellow-500">Dashboard</h1>
          </div>
        </div>

        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full max-w-xl items-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-2 shadow-sm"
        >
          <Search className="text-yellow-500 w-4 h-4" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses, instructors, videos..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-600 text-yellow-500"
          />
        </form>

        <div className="flex items-center gap-2">
          <button
            className="hidden h-9 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-800 px-4 text-sm font-medium text-yellow-500 shadow-sm transition hover:bg-zinc-900 md:inline-flex"
            type="button"
            onClick={() => setIsVideoModalOpen(true)}
          >
            <Video className="w-4 h-4" />
            Video
          </button>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-800 text-zinc-700 shadow-sm transition hover:bg-zinc-900"
            type="button"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>

          <div className="relative">
            <button
              onClick={() => setOpenProfile((prev) => !prev)}
              className="flex h-9 items-center gap-2 rounded-lg border border-yellow-500 bg-zinc-800 px-3 shadow-sm transition hover:bg-zinc-900"
              type="button"
            >
              <div
                className="text-zinc-600 uppercase w-7 h-7 hover:scale-90
               rounded-full bg-yellow-500 justify-center flex text-2xl font-black items-center text-center
              "
              >
                {user.username.charAt(0)}
              </div>
              <div className="hidden text-left md:block">
                <p className="text-sm font-semibold text-zinc-600">
                  {user.username}
                </p>
              </div>
            </button>

            {openProfile && (
              <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-lg bg-zinc-900 shadow-xl animate-modal">
                <div className="border-b border-zinc-800 px-4 py-3 m-1">
                  <p className="text-sm font-semibold text-zinc-300">
                    {user.username}
                  </p>
                  <p className="text-xs text-zinc-600">{user.email}</p>
                </div>

                <button
                  className="flex w-full items-center gap-2 px-4 py-3 text-sm text-zinc-400 transition hover:bg-zinc-800"
                  type="button"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="flex w-full
                  hover:text-zinc-200 cursor-pointer
                  items-center gap-2 px-4 py-3 text-sm text-zinc-600 transition hover:bg-red-900"
                  type="button"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 justify-center w-[95%] mx-auto mt-8 animate-modal">
          <div className="bg-zinc-950 justify-center items-center rounded-md border-r-3 border-lime-500 shadow-md shadow-lime-400">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-semibold text-zinc-400 p-4 ml-4">
                Video View dashboard
              </h3>
              <div className="hidden md:flex items-center justify-between gap-10">
                <ul className="flex text-zinc-500 gap-4 items-center justify-center">
                  <li>
                    <a href="/">
                      <img
                        src={defaultImage}
                        alt=""
                        className="w-8 h-8 mr-10 border rounded-full"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center gap-1"
                    >
                      <HeartPlus className="w-4 h-4"/>
                      Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center justify-center gap-1"> 
                      <Info className="w-4 h-4"/>
                      <span>Advice</span>
                      </a>
                  </li>
                </ul>
                <button
                  onClick={() => setIsVideoModalOpen(false)}
                  className="text-red-500 text-2xl p-2 mr-4 bg-zinc-800 rounded-full flex
              hover:bg-red-500 hover:text-zinc-300 cursor-pointer transition-all duration-300
              hover:scale-95"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            <VideoSection />
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminNavbar;
