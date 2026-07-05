/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * StatisticGrid.jsx
 *
 * Description:
 * Dashboard Statistics Grid
 *
 * Receives the complete dashboard object
 * and extracts only the statistics section.
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 4.0.0
 * ==========================================================
 */

import {
  HiUsers,
  HiCheckCircle,
  HiXCircle,
  HiUserGroup,
} from "react-icons/hi2";

import StatisticCard from "../StatisticsCard/StatisticCard";

import styles from "./StatisticGrid.module.css";

const StatisticGrid = ({
  dashboard,
}) => {
  const statistics =
    dashboard?.statistics ?? {};

  const cards = [
    {
      id: 1,
      title: "Total RSVPs",
      value:
        statistics.totalRSVPs ?? 0,
      icon: HiUsers,
      color: "#0B2A61",
    },

    {
      id: 2,
      title: "Attending",
      value:
        statistics.attending ?? 0,
      icon: HiCheckCircle,
      color: "#10B981",
    },

    {
      id: 3,
      title: "Declined",
      value:
        statistics.declined ?? 0,
      icon: HiXCircle,
      color: "#EF4444",
    },

    {
      id: 4,
      title: "Total Guests",
      value:
        statistics.totalGuests ?? 0,
      icon: HiUserGroup,
      color: "#D5AD36",
    },
  ];

  return (
    <section className={styles.grid}>
      {cards.map((card) => (
        <StatisticCard
          key={card.id}
          title={card.title}
          value={card.value}
          icon={card.icon}
          color={card.color}
        />
      ))}
    </section>
  );
};

export default StatisticGrid;