/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * HamburgerButton.jsx
 *
 * Description:
 * Mobile Sidebar Toggle Button
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

import { HiBars3 } from "react-icons/hi2";

import styles from "./HamburgerButton.module.css";

const HamburgerButton = ({
  onClick,
}) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label="Open navigation menu"
    >
      <HiBars3
        className={styles.icon}
      />
    </button>
  );
};

export default HamburgerButton;