/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * AttendanceChart.jsx
 *
 * Description:
 * Attendance Distribution Doughnut Chart
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import ChartCard from "../ChartCard/ChartCard";

import styles from "./AttendanceChart.module.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const AttendanceChart = ({
  dashboard,
}) => {
  const statistics =
    dashboard?.statistics ?? {};

  const attending =
    statistics.attending ?? 0;

  const declined =
    statistics.declined ?? 0;

  const data = {
    labels: [
      "Attending",
      "Declined",
    ],

    datasets: [
      {
        data: [
          attending,
          declined,
        ],

        backgroundColor: [
          "#0B2A61",
          "#D5AD36",
        ],

        borderColor: [
          "#FFFFFF",
          "#FFFFFF",
        ],

        borderWidth: 3,

        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    cutout: "68%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          usePointStyle: true,

          pointStyle: "circle",

          padding: 24,

          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <ChartCard
      title="Attendance Distribution"
      subtitle="Guest attendance overview"
    >
      <div className={styles.chart}>
        <Doughnut
          data={data}
          options={options}
        />
      </div>
    </ChartCard>
  );
};

export default AttendanceChart;