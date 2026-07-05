/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * MobileSidebar.jsx
 *
 * Description:
 * Mobile Navigation Drawer
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import { NavLink } from "react-router-dom";

import {
  HiOutlineSquares2X2,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineXMark,
} from "react-icons/hi2";

import { logout } from "../../../../../services/authService";

import styles from "./MobileSidebar.module.css";

const MobileSidebar = ({
  open,
  onClose,
}) => {
  const handleLogout =
    async () => {
      await logout();
      window.location.href =
        "/admin/login";
    };

  const handleNavigate =
    () => {
      onClose();
    };

  return (
    <>
      {open && (
        <div
          className={styles.overlay}
          onClick={onClose}
        />
      )}

      <aside
        className={`${styles.sidebar} ${
          open
            ? styles.open
            : ""
        }`}
      >
        {/* ====================================== */}
        {/* Header */}
        {/* ====================================== */}

        <header
          className={styles.brand}
        >
          <div>
            <h2
              className={
                styles.title
              }
            >
              Geo & Kristine
            </h2>

            <p
              className={
                styles.subtitle
              }
            >
              Wedding RSVP
              System
            </p>
          </div>

          <button
            type="button"
            className={
              styles.close
            }
            onClick={onClose}
            aria-label="Close Menu"
          >
            <HiOutlineXMark />
          </button>
        </header>

        {/* ====================================== */}
        {/* Navigation */}
        {/* ====================================== */}

        <nav
          className={
            styles.navigation
          }
        >
          <NavLink
            to="/admin/dashboard"
            end
            onClick={
              handleNavigate
            }
            className={({
              isActive,
            }) =>
              `${styles.link} ${
                isActive
                  ? styles.active
                  : ""
              }`
            }
          >
            <HiOutlineSquares2X2 />

            Dashboard
          </NavLink>

          <NavLink
            to="/admin/rsvp"
            onClick={
              handleNavigate
            }
            className={({
              isActive,
            }) =>
              `${styles.link} ${
                isActive
                  ? styles.active
                  : ""
              }`
            }
          >
            <HiOutlineUsers />

            RSVP Management
          </NavLink>

          <NavLink
            to="/admin/settings"
            onClick={
              handleNavigate
            }
            className={({
              isActive,
            }) =>
              `${styles.link} ${
                isActive
                  ? styles.active
                  : ""
              }`
            }
          >
            <HiOutlineCog6Tooth />

            Settings
          </NavLink>
        </nav>

        {/* ====================================== */}
        {/* Footer */}
        {/* ====================================== */}

        <footer
          className={styles.footer}
        >
          <button
            type="button"
            className={
              styles.logout
            }
            onClick={
              handleLogout
            }
          >
            <HiOutlineArrowLeftOnRectangle />

            Logout
          </button>
        </footer>
      </aside>
    </>
  );
};

export default MobileSidebar;