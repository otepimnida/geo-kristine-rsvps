/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * DashboardPage.jsx
 *
 * Description:
 * Administrator Dashboard Page
 *
 * Responsibilities:
 * - Dashboard Header
 * - Statistics Overview
 * - Attendance Distribution
 * - Empty State
 * - Error State
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 5.0.0
 * ==========================================================
 */

import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";

import useDashboard from "../../../hooks/dashboard/useDashboard";

import styles from "./DashboardPage.module.css";

import {
  StatisticsGrid,
  AttendanceChart,
  DashboardEmptyState,
  DashboardErrorState,
} from "./components";

const DashboardPage = () => {
  const {
    dashboard,
    loading,
    error,
    reloadDashboard,
  } = useDashboard();

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <DashboardLayout>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>

          <h2>Loading Dashboard...</h2>

          <p>
            Please wait while we retrieve your dashboard
            information.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  if (error) {
    return (
      <DashboardLayout>
        <DashboardErrorState
          message={error}
          onRetry={reloadDashboard}
        />
      </DashboardLayout>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Page
  |--------------------------------------------------------------------------
  */

  return (
    <DashboardLayout>
      <section className={styles.dashboard}>
        {/* ========================================= */}
        {/* Header */}
        {/* ========================================= */}

        <header className={styles.header}>
          <h1>Dashboard</h1>

          <p>
            Welcome back! Here's a quick overview of your
            wedding RSVP management system.
          </p>
        </header>

        {/* ========================================= */}
        {/* Statistics */}
        {/* ========================================= */}

        <StatisticsGrid
          dashboard={dashboard}
        />

        {/* ========================================= */}
        {/* Attendance Distribution */}
        {/* ========================================= */}

        <AttendanceChart
          dashboard={dashboard}
        />

        {/* ========================================= */}
        {/* Empty State */}
        {/* ========================================= */}

        {dashboard?.statistics?.totalRSVPs ===
          0 && (
          <DashboardEmptyState
            onRefresh={
              reloadDashboard
            }
          />
        )}
      </section>
    </DashboardLayout>
  );
};

export default DashboardPage;