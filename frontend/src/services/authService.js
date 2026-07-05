/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * authService.js
 *
 * Description:
 * Authentication Service Layer
 *
 * Responsibilities:
 * - Administrator Login
 * - Logout
 * - Get Current Profile
 * - Authentication Helpers
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import api from "./api";

/*
|--------------------------------------------------------------------------
| API Endpoint
|--------------------------------------------------------------------------
*/

const AUTH_ENDPOINT = "/auth";

/*
|--------------------------------------------------------------------------
| Login Administrator
|--------------------------------------------------------------------------
*/

export const login = async (credentials) => {
  const payload = {
    email: credentials.email
      .trim()
      .toLowerCase(),

    password: credentials.password,
  };

  const response = await api.post(
    `${AUTH_ENDPOINT}/login`,
    payload
  );

  /*
  ------------------------------------------------------------
  Backend Response

  {
      success: true,
      message: "...",
      data: {
          token,
          admin
      }
  }

  Return only the business data.
  ------------------------------------------------------------
  */

  return response.data.data;
};

/*
|--------------------------------------------------------------------------
| Logout Administrator
|--------------------------------------------------------------------------
*/

export const logout = async () => {
  try {
    await api.post(
      `${AUTH_ENDPOINT}/logout`
    );
  } catch (error) {
    /*
     * Ignore logout API errors.
     * Local session will still be cleared.
     */
    console.warn(
      "Logout API warning:",
      error.message
    );
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
  }
};

/*
|--------------------------------------------------------------------------
| Get Current Administrator Profile
|--------------------------------------------------------------------------
*/

export const getProfile =
  async () => {
    const response =
      await api.get(
        `${AUTH_ENDPOINT}/profile`
      );

    return response.data.data;
  };

/*
|--------------------------------------------------------------------------
| Authentication Helpers
|--------------------------------------------------------------------------
*/

/**
 * Get JWT Token
 */

export const getToken = () => {
  return localStorage.getItem(
    "token"
  );
};

/**
 * Get Logged-in Administrator
 */

export const getAdmin = () => {
  const admin =
    localStorage.getItem("admin");

  if (!admin) {
    return null;
  }

  try {
    return JSON.parse(admin);
  } catch {
    return null;
  }
};

/**
 * Check Authentication
 */

export const isAuthenticated =
  () => {
    return Boolean(getToken());
  };

/**
 * Save Login Session
 */

export const saveSession = ({
  token,
  admin,
}) => {
  localStorage.setItem(
    "token",
    token
  );

  localStorage.setItem(
    "admin",
    JSON.stringify(admin)
  );
};

/**
 * Clear Login Session
 */

export const clearSession =
  () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "admin"
    );
  };