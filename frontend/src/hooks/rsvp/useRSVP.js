/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * useRSVP.js
 *
 * Description:
 * RSVP Management Hook
 *
 * Responsibilities:
 * - Load RSVP Records
 * - Normalize Backend Data
 * - Compute Statistics
 * - Search
 * - Status Filtering
 * - Loading State
 * - Error State
 * - Refresh Data
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 4.0.0
 * ==========================================================
 */

import {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import toast from "react-hot-toast";

import {
  getAllRSVPs,
  normalizeRSVP,
  calculateStatistics,
} from "../../services/rsvpService";

/*
|--------------------------------------------------------------------------
| Hook
|--------------------------------------------------------------------------
*/

const useRSVP = () => {

  /*
  |--------------------------------------------------------------------------
  | States
  |--------------------------------------------------------------------------
  */

  const [guests, setGuests] =
    useState([]);

  const [statistics, setStatistics] =
    useState({

      totalRSVPs: 0,

      attending: 0,

      declined: 0,

    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | Search
  |--------------------------------------------------------------------------
  */

  const [search, setSearch] =
    useState("");

  /*
  |--------------------------------------------------------------------------
  | Status Filter
  |--------------------------------------------------------------------------
  */

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All");

  /*
  |--------------------------------------------------------------------------
  | Load RSVP Records
  |--------------------------------------------------------------------------
  */

  const loadRSVPs =
    useCallback(async () => {

      try {

        setLoading(true);

        setError("");

        const records =
          await getAllRSVPs();

        const normalized =
          records.map(
            normalizeRSVP
          );

        setGuests(normalized);

        /*
        |--------------------------------------------------------------------------
        | Statistics
        |--------------------------------------------------------------------------
        */

        const stats =
          calculateStatistics(records);

        setStatistics({

          totalRSVPs:
            stats.totalRSVPs,

          attending:
            stats.attending,

          declined:
            stats.declined,

        });

      } catch (err) {

        console.error(err);

        const message =

          err.response?.data?.message ||

          "Unable to load RSVP records.";

        setError(message);

        toast.error(message);

      } finally {

        setLoading(false);

      }

    }, []);

  /*
  |--------------------------------------------------------------------------
  | Refresh
  |--------------------------------------------------------------------------
  */

  const refresh =
    useCallback(async () => {

      await loadRSVPs();

    }, [loadRSVPs]);

  /*
  |--------------------------------------------------------------------------
  | Filter Guests
  |--------------------------------------------------------------------------
  */

  const filteredGuests =
    useMemo(() => {

      let filtered = [...guests];

      /*
      -----------------------------
      Search
      -----------------------------
      */

      if (search.trim()) {

        const keyword =
          search
            .trim()
            .toLowerCase();

        filtered =
          filtered.filter(
            (guest) =>

              guest.fullName
                .toLowerCase()
                .includes(keyword)

              ||

              guest.email
                .toLowerCase()
                .includes(keyword)

          );

      }

      /*
      -----------------------------
      Status
      -----------------------------
      */

      if (
        statusFilter !== "All"
      ) {

        filtered =
          filtered.filter(
            (guest) =>

              guest.status ===
              statusFilter

          );

      }

      return filtered;

    }, [

      guests,

      search,

      statusFilter,

    ]);

  /*
  |--------------------------------------------------------------------------
  | Initial Load
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    loadRSVPs();

  }, [loadRSVPs]);

  /*
  |--------------------------------------------------------------------------
  | Exports
  |--------------------------------------------------------------------------
  */

  return {

    guests,

    filteredGuests,

    statistics,

    loading,

    error,

    refresh,

    search,

    setSearch,

    statusFilter,

    setStatusFilter,

  };

};

export default useRSVP;