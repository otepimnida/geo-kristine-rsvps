/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * ChartCard.jsx
 *
 * Description:
 * Reusable Dashboard Chart Container
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

import styles from "./ChartCard.module.css";

const ChartCard = ({
  title,
  subtitle,
  actions,
  children,
}) => {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <div>
          <h2 className={styles.title}>
            {title}
          </h2>

          {subtitle && (
            <p className={styles.subtitle}>
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className={styles.actions}>
            {actions}
          </div>
        )}
      </header>

      <div className={styles.body}>
        {children}
      </div>
    </section>
  );
};

export default ChartCard;