/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * DashboardLayout.jsx
 *
 * Description:
 * Production Dashboard Layout
 *
 * Responsibilities:
 * - Fixed Desktop Sidebar
 * - Mobile Sidebar
 * - Sticky Topbar
 * - Scrollable Content
 * - Shared Layout for all Admin Pages
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 5.0.0
 * ==========================================================
 */

import { useState } from "react";

import styles from "./DashboardLayout.module.css";

import {
  Sidebar,
  Topbar,
  MobileSidebar,
} from "../../pages/Admin/Dashboard/components";

const DashboardLayout = ({
  children,
}) => {
  const [
    mobileSidebarOpen,
    setMobileSidebarOpen,
  ] = useState(false);

  const openSidebar = () =>
    setMobileSidebarOpen(true);

  const closeSidebar = () =>
    setMobileSidebarOpen(false);

  return (
    <div className={styles.layout}>
      {/* Desktop Sidebar */}

      <Sidebar />

      {/* Mobile Sidebar */}

      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={closeSidebar}
      />

      {/* Main */}

      <div className={styles.main}>
        {/* Sticky Topbar */}

        <Topbar
          onMenuClick={openSidebar}
        />

        {/* Scrollable Page */}

        <main
          className={styles.content}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;