import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { getAnalytics } from "../../api/analyticsApi";
import AnalyticsChart from "../../components/admin/AnalyticsChart";

const AnalyticsPage = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
const load = async () => {
  try {
    const data = await getAnalytics();

    console.log("Analytics Response:", data);

    setAnalytics(data);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

    load();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-black text-yellow-500">Analytics</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="mt-6 bg-zinc-900 p-6 rounded-md">
            <AnalyticsChart analytics={analytics} />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AnalyticsPage;
