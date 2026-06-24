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
          value={loading ? "..." : dashboardStats.stats.courses}
          icon={BookOpen}
        />

        <StatsCard
          title="Students"
          value={loading ? "..." : dashboardStats.stats.students}
          icon={Users}
        />

        <StatsCard
          title="Instructors"
          value={loading ? "..." : dashboardStats.stats.instructors}
          icon={LaptopMinimalCheck}
        />

        <StatsCard
          title="Views"
          value={loading ? "..." : dashboardStats.stats.views}
          icon={Eye}
        />
      </div>
      <RecentCourses 
      courses={dashboardStats.recent_courses}
      />
    </AdminLayout>
  );
};

export default Dashboard;
