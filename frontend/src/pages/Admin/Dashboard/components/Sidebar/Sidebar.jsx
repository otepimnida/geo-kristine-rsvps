/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * Sidebar.jsx
 *
 * Description:
 * Administrator Sidebar
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 5.0.0
 * ==========================================================
 */

import { NavLink } from "react-router-dom";

import {
  HiSquares2X2,
  HiUsers,
  HiCog6Tooth,
  HiArrowLeftOnRectangle,
} from "react-icons/hi2";

import { logout } from "../../../../../services/authService";

import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const navClass = ({ isActive }) =>
    `${styles.link} ${isActive ? styles.active : ""}`;

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <aside className={styles.sidebar}>
      {/* Brand */}

      <div className={styles.brand}>
        <h1 className={styles.title}>
          Geo & Kristine
        </h1>

        <p className={styles.subtitle}>
          Wedding RSVP System
        </p>
      </div>

      {/* Navigation */}

      <nav className={styles.navigation}>
        <NavLink
          to="/admin/dashboard"
          className={navClass}
        >
          <HiSquares2X2 />

          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/rsvp"
          className={navClass}
        >
          <HiUsers />

          <span>
            RSVP Management
          </span>
        </NavLink>

        <NavLink
          to="/admin/settings"
          className={navClass}
        >
          <HiCog6Tooth />

          <span>Settings</span>
        </NavLink>
      </nav>

      {/* Footer */}

      <footer className={styles.footer}>
        <button
          className={styles.logout}
          onClick={handleLogout}
          type="button"
        >
          <HiArrowLeftOnRectangle />

          <span>Logout</span>
        </button>
      </footer>
    </aside>
  );
};

export default Sidebar;