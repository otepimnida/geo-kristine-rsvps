/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * dashboardService.js
 *
 * Description:
 * Dashboard API Service
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import api from "./api";

const ENDPOINT = "/dashboard";

/**
 * ----------------------------------------------------------
 * Get Dashboard Summary
 * ----------------------------------------------------------
 */

export const getDashboard =
  async () => {
    const response =
      await api.get(ENDPOINT);

    return response.data;
  };