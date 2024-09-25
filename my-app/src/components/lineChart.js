'use client'

import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  // Generate random leads data for each hour (0 to 23)
  const leadsData = Array.from({ length: 24 }, () => Math.floor(Math.random() * 20)); // Replace this with actual data from your API

  // X-axis labels representing hours of the day
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  // Chart.js data configuration
  const chartData = {
    labels: hours,
    datasets: [
      {
        label: "Number of Leads",
        data: leadsData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  // Chart.js options
  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour of the Day",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Leads",
        },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineChart;
