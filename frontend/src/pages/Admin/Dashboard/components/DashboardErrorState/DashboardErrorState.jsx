/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * DashboardErrorState.jsx
 *
 * Description:
 * Dashboard Error State Component
 *
 * Displays a professional error message whenever
 * the dashboard fails to load.
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

import { HiExclamationTriangle } from "react-icons/hi2";

import styles from "./DashboardErrorState.module.css";

const DashboardErrorState = ({
  title = "Unable to Load Dashboard",
  message = "We couldn't retrieve the latest dashboard information. Please check your internet connection or try again.",
  onRetry,
}) => {
  return (
    <section className={styles.container}>
      {/* ====================================== */}
      {/* Icon */}
      {/* ====================================== */}

      <div className={styles.iconWrapper}>
        <HiExclamationTriangle
          className={styles.icon}
        />
      </div>

      {/* ====================================== */}
      {/* Content */}
      {/* ====================================== */}

      <h2 className={styles.title}>
        {title}
      </h2>

      <p className={styles.description}>
        {message}
      </p>

      {/* ====================================== */}
      {/* Action */}
      {/* ====================================== */}

      <button
        type="button"
        className={styles.button}
        onClick={onRetry}
      >
        Try Again
      </button>
    </section>
  );
};

export default DashboardErrorState;