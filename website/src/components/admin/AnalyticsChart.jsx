import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const AnalyticsChart = ({ analytics }) => {
  if (!analytics) {
    return <p className="text-zinc-600 font-medium">No analytics data available</p>;
  }

  const data = {
    labels: ["Courses", "Students", "Instructors", "Views"],
    datasets: [
      {
        label: "Platform Statistics",
        data: [
          analytics.courses || 0,
          analytics.students || 0,
          analytics.instructors || 0,
          analytics.views || 0,
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return <Bar data={data} options={options}  className="shadow-lg shadow-zinc-800 rounded-md"/>;
};

export default AnalyticsChart;
