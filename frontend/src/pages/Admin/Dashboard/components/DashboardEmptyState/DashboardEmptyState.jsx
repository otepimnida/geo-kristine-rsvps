/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * DashboardEmptyState.jsx
 *
 * Description:
 * Dashboard Empty State Component
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

import { HiInbox } from "react-icons/hi2";

import styles from "./DashboardEmptyState.module.css";

const DashboardEmptyState = ({
  onRefresh,
}) => {
  return (
    <section className={styles.container}>
      <div className={styles.iconWrapper}>
        <HiInbox className={styles.icon} />
      </div>

      <h2 className={styles.title}>
        No RSVP Responses Yet
      </h2>

      <p className={styles.description}>
        Your dashboard is ready.
        Once your invited guests begin
        responding to your wedding invitation,
        statistics and analytics will appear here.
      </p>

      <button
        type="button"
        className={styles.button}
        onClick={onRefresh}
      >
        Refresh Dashboard
      </button>
    </section>
  );
};

export default DashboardEmptyState;