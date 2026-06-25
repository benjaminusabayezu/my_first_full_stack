import { BookOpen, Users, LaptopMinimalCheck, Eye } from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import RecentCourses from "../../components/admin/RecentCourses";
import StatsCard from "../../components/admin/StatsCard";
import { getDashboardStats } from "../../api/dashboardApi";
import { useEffect, useState } from "react";





const Dashboard = () => {



    const [dashboardStats, setDashboardStats] = useState({
      stats:{},
      recent_courses:[],
    });
    const [loading, setLoading] = useState (true)
    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getDashboardStats();

          setDashboardStats(data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);
  return (
    <AdminLayout>
      <div className="grid md:grid-cols-4 gap-6 ">
        <StatsCard
          title="Courses"
          value={
            loading ? (
              <div className="w-8 h-8 border-4 border-t-transparent rounded-full border-l-lime-600 border-r-yellow-500 animate-spin" />
            ) : (
              dashboardStats.stats.courses
            )
          }
          icon={BookOpen}
        />

        <StatsCard
          title="Students"
          value={
            loading ? (
              <div className="w-8 h-8 border-4 border-t-transparent rounded-full border-l-lime-600 border-r-yellow-500 animate-spin" />
            ) : (
              dashboardStats.stats.students
            )
          }
          icon={Users}
        />

        <StatsCard
          title="Instructors"
          value={
            loading ? (
              <div className="w-8 h-8 border-4 border-t-transparent rounded-full border-l-lime-600 border-r-yellow-500 animate-spin" />
            ) : (
              dashboardStats.stats.instructors
            )
          }
          icon={LaptopMinimalCheck}
        />

        <StatsCard
          title="Views"
          value={
            loading ? (
              <div className="w-8 h-8 border-4 border-t-transparent rounded-full border-l-lime-600 border-r-yellow-500 animate-spin" />
            ) : (
              dashboardStats.stats.views
            )
          }
          icon={Eye}
        />
      </div>
      <RecentCourses courses={dashboardStats.recent_courses} />
    </AdminLayout>
  );
};

export default Dashboard;
