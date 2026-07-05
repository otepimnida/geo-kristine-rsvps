/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * Topbar.jsx
 *
 * Description:
 * Production Administrator Topbar
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 5.0.0
 * ==========================================================
 */

import {
  HiBell,
  HiChevronDown,
} from "react-icons/hi2";

import {
  HamburgerButton,
} from "..";

import {
  getAdmin,
} from "../../../../../services/authService";

import styles from "./Topbar.module.css";

const Topbar = ({
  onMenuClick,
}) => {
  const admin = getAdmin();

  const initial =
    admin?.username
      ?.charAt(0)
      ?.toUpperCase() || "A";

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <HamburgerButton
          onClick={onMenuClick}
        />

        <div className={styles.brand}>
          <h2>
            Geo & Kristine
          </h2>

          <span>
            Wedding RSVP System
          </span>
        </div>
      </div>

      <div className={styles.right}>
        <button
          className={styles.notification}
          type="button"
        >
          <HiBell />
        </button>

        <button
          className={styles.profile}
          type="button"
        >
          <div className={styles.avatar}>
            {initial}
          </div>

          <div className={styles.info}>
            <strong>
              {admin?.username ||
                "Administrator"}
            </strong>

            <small>
              System Administrator
            </small>
          </div>

          <HiChevronDown />
        </button>
      </div>
    </header>
  );
};

export default Topbar;