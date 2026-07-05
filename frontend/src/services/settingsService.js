/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * settingsService.js
 *
 * Description:
 * Settings API Service
 *
 * Responsibilities:
 * - Wedding Information
 * - Administrator Profile
 * - Change Password
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

import api from "./api";

/*
|--------------------------------------------------------------------------
| Wedding Settings
|--------------------------------------------------------------------------
*/

/**
 * Get Wedding Settings
 */

export const getSettings = async () => {

  const { data } = await api.get(
    "/settings"
  );

  return data.data;

};

/**
 * Update Wedding Information
 */

export const updateWedding =
  async (payload) => {

    const { data } =
      await api.put(
        "/settings/wedding",
        payload
      );

    return data.data;

  };

/*
|--------------------------------------------------------------------------
| Administrator Profile
|--------------------------------------------------------------------------
*/

/**
 * Get Administrator Profile
 */

export const getProfile =
  async () => {

    const { data } =
      await api.get(
        "/settings/profile"
      );

    return data.data;

  };

/**
 * Update Administrator Profile
 */

export const updateProfile =
  async (payload) => {

    const { data } =
      await api.put(
        "/settings/profile",
        payload
      );

    return data.data;

  };

/*
|--------------------------------------------------------------------------
| Security
|--------------------------------------------------------------------------
*/

/**
 * Change Password
 */

export const changePassword =
  async (payload) => {

    const { data } =
      await api.put(
        "/settings/password",
        payload
      );

    return data.data;

  };

/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

const settingsService = {

  getSettings,

  updateWedding,

  getProfile,

  updateProfile,

  changePassword,

};

export default settingsService;