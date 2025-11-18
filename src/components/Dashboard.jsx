import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BASE_URL = "https://url-shortener-jgh8.onrender.com";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/shorturls/`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const labels = data.map((d) => d.short_code);
  const clicks = data.map((d) => d.clicks);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Clicks",
        data: clicks,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="py-6">
      <div className="max-w-4xl mx-auto bg-white/30 backdrop-blur-xl p-6 rounded-2xl border">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Top Links by Clicks</h3>
          <ul>
            {data
              .slice()
              .sort((a, b) => b.clicks - a.clicks)
              .slice(0, 5)
              .map((d) => (
                <li key={d.id} className="py-2 border-b last:border-b-0">
                  <div className="flex justify-between">
                    <div>
                      <div className="text-sm font-medium">
                        {d.original_url}
                      </div>
                      <div className="text-xs text-gray-600">
                        {d.short_code}
                      </div>
                    </div>
                    <div className="text-sm">{d.clicks}</div>
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Clicks per Short Code</h3>
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
}
