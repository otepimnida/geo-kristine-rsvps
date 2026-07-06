/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * rsvpService.js
 *
 * Description:
 * Unified RSVP Service
 *
 * Responsibilities:
 * ----------------------------------------------------------
 * PUBLIC
 * - Submit RSVP
 *
 * ADMIN
 * - Get All RSVPs
 * - Get RSVP By ID
 * - Update RSVP
 * - Delete RSVP
 *
 * HELPERS
 * - Normalize RSVP
 * - Calculate Statistics
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 3.0.0
 * ==========================================================
 */

import api from "./api";

/*
|--------------------------------------------------------------------------
| API Endpoint
|--------------------------------------------------------------------------
*/

const RSVP_ENDPOINT = "/rsvp";

/*
|--------------------------------------------------------------------------
| PUBLIC
|--------------------------------------------------------------------------
*/

/**
 * Submit RSVP
 */

export const submitRSVP = async (
  payload
) => {
  const { data } =
    await api.post(
      RSVP_ENDPOINT,
      payload
    );

  return data.data;
};

/*
|--------------------------------------------------------------------------
| ADMIN
|--------------------------------------------------------------------------
*/

/**
 * Get All RSVP Records
 */

export const getAllRSVPs =
  async () => {
    const { data } =
      await api.get(
        RSVP_ENDPOINT
      );

    return data.data;
  };

/**
 * Get RSVP By ID
 */

export const getRSVPById =
  async (id) => {
    const { data } =
      await api.get(
        `${RSVP_ENDPOINT}/${id}`
      );

    return data.data;
  };

/**
 * Update RSVP
 */

export const updateRSVP =
  async (id, payload) => {
    const { data } =
      await api.put(
        `${RSVP_ENDPOINT}/${id}`,
        payload
      );

    return data.data;
  };

/**
 * Delete RSVP
 */

export const deleteRSVP =
  async (id) => {
    const { data } =
      await api.delete(
        `${RSVP_ENDPOINT}/${id}`
      );

    return data;
  };

/*
|--------------------------------------------------------------------------
| HELPERS
|--------------------------------------------------------------------------
*/

/**
 * Normalize backend data
 * for the frontend.
 */

export const normalizeRSVP = (
  guest
) => ({
  id: guest.id,

  fullName:
    guest.full_name,

  email: guest.email,

  attendance:
    guest.attendance,

  status: guest.attendance
    ? "Attending"
    : "Declined",

  totalGuests:
    Number(
      guest.guest_count || 0
    ),

  guestCount:
    Number(
      guest.guest_count || 0
    ),

  message:
    guest.message || "",

  createdAt:
    new Date(
      guest.created_at
    ).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    ),
});

/**
 * Calculate Dashboard Statistics
 */

export const calculateStatistics = (
  rsvps = []
) => {

  const totalRSVPs =
    rsvps.length;

  const attending =
    rsvps.filter(
      (guest) =>
        guest.attendance
    ).length;

  const declined =
    rsvps.filter(
      (guest) =>
        !guest.attendance
    ).length;

  return {

    totalRSVPs,

    attending,

    declined,

  };

};