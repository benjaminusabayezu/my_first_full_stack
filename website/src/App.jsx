import { Routes, Route } from "react-router-dom";

import PortfolioLayouts from "./layouts/PortfolioLayouts";

import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";

import Home from "./components/pages/Home";
import Project from "./components/pages/Project";
import Delete from "./components/pages/Delete";
import TaskPage from "./components/pages/TaskPage";
import TaskForm from "./components/pages/TaskForm";
import TaskItem from "./components/pages/TaskItem";
import {Provider} from 'react-redux';
import {store} from "./components/Store/store"
import Footer from "./components/Footer";
import Skills from "./components/pages/Skills";
import Experience from "./components/Experience";
import Activities from "./components/Activities";
import Contact from "./components/Contact";
import UnderDevelopment from "./components/reusables/UnderDevelopment";
import Dashboard from "./pages/admin/Dashboard";
import CoursesPage from "./pages/admin/CoursesPage";
import VideoSection from "./components/video_page/VideoSection";
import StudentsPage from "./pages/admin/StudentsPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import CreateAdmin from "./pages/admin/CreateAdmin";

function App() {
  return (
    <Routes>
      <Route element={<PortfolioLayouts />}>
        <Route
          path="/"
          element={
            <main>
              <HeroSection />
              <AboutSection />
              <Experience />
              <Contact />
              <Footer />
            </main>
          }
        />

        <Route
          path="/home"
          element={
            <Provider store={store}>
              <Home />
            </Provider>
          }
        />
        <Route path="/skills" element={<Skills />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/notfound" element={<UnderDevelopment />} />
      </Route>
       <Route path="/admin" element={<Dashboard />} />
       <Route path="/admin/courses" element={<CoursesPage />} />
       <Route path="/video/player" element={<VideoSection />} />
       <Route path="/admin/students" element={<StudentsPage />} />
       <Route path="/admin/analytics" element={<AnalyticsPage />} />
       <Route path="/admin/settings" element={<SettingsPage />} />
       <Route path="/create-admin" element={<CreateAdmin />} />
    </Routes>
  );
}

export default App;
