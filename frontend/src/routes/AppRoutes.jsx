/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * AppRoutes.jsx
 *
 * Description:
 * Application Route Configuration
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 3.0.0
 * ==========================================================
 */

import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

/*
|--------------------------------------------------------------------------
| Public Pages
|--------------------------------------------------------------------------
*/

import LandingPage from "../pages/Landing";
import RSVPPage from "../pages/RSVP";

/*
|--------------------------------------------------------------------------
| Admin Pages
|--------------------------------------------------------------------------
*/

import LoginPage from "../pages/Admin/Login";
import DashboardPage from "../pages/Admin/Dashboard";
import RSVPManagementPage from "../pages/Admin/RSVP";
import SettingsPage from "../pages/Admin/Settings";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================================================
          Public Routes
      ================================================ */}

      <Route element={<PublicLayout />}>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/rsvp"
          element={<RSVPPage />}
        />

      </Route>

      {/* ================================================
          Admin Login
      ================================================ */}

      <Route
        path="/admin/login"
        element={<LoginPage />}
      />

      {/* ================================================
          Protected Admin
      ================================================ */}

      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >

        <Route
          path="/admin/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/admin/rsvp"
          element={<RSVPManagementPage />}
        />

        <Route
          path="/admin/settings"
          element={<SettingsPage />}
        />

      </Route>

      {/* ================================================
          Unknown Routes
      ================================================ */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
};

export default AppRoutes;