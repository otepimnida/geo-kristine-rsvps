/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * SettingsHeader.jsx
 *
 * Description:
 * Settings Page Header
 *
 * Responsibilities:
 * - Display page title
 * - Display page description
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

import styles from "./SettingsHeader.module.css";

const SettingsHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Settings
        </h1>

        <p className={styles.description}>
          Configure your Wedding RSVP
          System, administrator account,
          wedding information, and
          application preferences.
        </p>
      </div>
    </header>
  );
};

export default SettingsHeader;