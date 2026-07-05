/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * SaveSettingsButton.jsx
 *
 * Description:
 * Save Settings Button
 *
 * Responsibilities:
 * - Save System Settings
 * - Display Loading State
 * - Ready for Backend Integration
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

import {
  HiOutlineCheckCircle,
} from "react-icons/hi2";

import styles from "./SaveSettingsButton.module.css";

const SaveSettingsButton = ({
  loading = false,
  onClick,
}) => {
  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.button}
        disabled={loading}
        onClick={onClick}
      >
        <HiOutlineCheckCircle />

        <span>
          {loading
            ? "Saving Changes..."
            : "Save Changes"}
        </span>
      </button>
    </div>
  );
};

export default SaveSettingsButton;