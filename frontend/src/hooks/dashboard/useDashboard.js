/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * useDashboard.js
 *
 * Description:
 * Dashboard Business Logic
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import {
  useEffect,
  useState,
  useCallback,
} from "react";

import toast from "react-hot-toast";

import {
  getDashboard,
} from "../../services/dashboardService";

const INITIAL_STATE = {
  statistics: {
    totalRSVPs: 0,
    attending: 0,
    declined: 0,
    totalGuests: 0,
  },

  attendanceChart: [],

  monthlyChart: [],

  recentRSVPs: [],

  recentActivities: [],
};

const useDashboard = () => {
  const [
    dashboard,
    setDashboard,
  ] = useState(INITIAL_STATE);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const loadDashboard =
    useCallback(async () => {
      try {
        setLoading(true);

        const response =
          await getDashboard();

        /**
         * Backend Response
         *
         * {
         *   success,
         *   message,
         *   data
         * }
         */

        setDashboard(
          response.data ??
            INITIAL_STATE
        );
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Unable to load dashboard."
        );
      } finally {
        setLoading(false);
      }
    }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  return {
    dashboard,

    loading,

    refreshDashboard:
      loadDashboard,
  };
};

export default useDashboard;