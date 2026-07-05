/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * StatisticCard.jsx
 *
 * Description:
 * Premium Dashboard Statistic Card
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 4.0.0
 * ==========================================================
 */

import useCounter from "../../../../../hooks/animation/useCounter";

import styles from "./StatisticCard.module.css";

const StatisticCard = ({
  title,
  value = 0,
  icon: Icon,
  color = "#0B2A61",
}) => {
  const animatedValue =
    useCounter(value);

  return (
    <article className={styles.card}>
      {/* ====================================== */}
      {/* Icon */}
      {/* ====================================== */}

      <div
        className={styles.iconWrapper}
        style={{
          backgroundColor: `${color}15`,
        }}
      >
        <Icon
          className={styles.icon}
          style={{
            color,
          }}
        />
      </div>

      {/* ====================================== */}
      {/* Content */}
      {/* ====================================== */}

      <div className={styles.content}>
        <h2 className={styles.value}>
          {animatedValue.toLocaleString()}
        </h2>

        <p className={styles.title}>
          {title}
        </p>
      </div>
    </article>
  );
};

export default StatisticCard;