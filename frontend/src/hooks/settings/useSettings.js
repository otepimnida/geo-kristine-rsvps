/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * useSettings.js
 *
 * Description:
 * Settings Management Hook
 *
 * Responsibilities:
 * - Load Wedding Information
 * - Load Administrator Profile
 * - Manage Loading State
 * - Manage Error State
 * - Refresh Data
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

import {
  useState,
  useEffect,
  useCallback,
} from "react";

import toast from "react-hot-toast";

import {

  getSettings,

  getProfile,

  updateWedding,

  updateProfile,

  changePassword,

} from "../../services/settingsService";

/*
|--------------------------------------------------------------------------
| Hook
|--------------------------------------------------------------------------
*/

const useSettings = () => {

  /*
  |--------------------------------------------------------------------------
  | States
  |--------------------------------------------------------------------------
  */

  const [

    wedding,

    setWedding,

  ] = useState(null);

  const [

    profile,

    setProfile,

  ] = useState(null);

  const [

    loading,

    setLoading,

  ] = useState(true);

  const [

    error,

    setError,

  ] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Load Settings
  |--------------------------------------------------------------------------
  */

  const loadSettings =
    useCallback(async () => {

      try {

        setLoading(true);

        setError("");

        const [

          weddingData,

          profileData,

        ] = await Promise.all([

          getSettings(),

          getProfile(),

        ]);

        setWedding(
          weddingData
        );

        setProfile(
          profileData
        );

      } catch (err) {

        console.error(err);

        const message =

          err.response?.data
            ?.message ||

          "Unable to load settings.";

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

      await loadSettings();

    }, [loadSettings]);

  /*
  |--------------------------------------------------------------------------
  | Initial Load
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    loadSettings();

  }, [loadSettings]);
  /*
|--------------------------------------------------------------------------
| Update Wedding Information
|--------------------------------------------------------------------------
*/

const saveWedding =
  useCallback(async (payload) => {

    try {

      setLoading(true);

      await updateWedding(
        payload
      );

      await refresh();

      toast.success(
        "Wedding information updated successfully."
      );

      return true;

    } catch (err) {

      console.error(err);

      const message =

        err.response?.data
          ?.message ||

        "Unable to update wedding information.";

      toast.error(
        message
      );

      return false;

    } finally {

      setLoading(false);

    }

  }, [refresh]);
  /*
|--------------------------------------------------------------------------
| Update Administrator Profile
|--------------------------------------------------------------------------
*/

const saveProfile =
  useCallback(async (payload) => {

    try {

      setLoading(true);

      await updateProfile(
        payload
      );

      await refresh();

      toast.success(
        "Administrator profile updated successfully."
      );

      return true;

    } catch (err) {

      console.error(err);

      const message =

        err.response?.data
          ?.message ||

        "Unable to update administrator profile.";

      toast.error(
        message
      );

      return false;

    } finally {

      setLoading(false);

    }

  }, [refresh]);

  /*
|--------------------------------------------------------------------------
| Change Administrator Password
|--------------------------------------------------------------------------
*/

const savePassword =
  useCallback(async (payload) => {

    try {

      setLoading(true);

      await changePassword(
        payload
      );

      toast.success(
        "Password changed successfully."
      );

      return true;

    } catch (err) {

      console.error(err);

      const message =

        err.response?.data
          ?.message ||

        "Unable to change password.";

      toast.error(
        message
      );

      return false;

    } finally {

      setLoading(false);

    }

  }, []);

  /*
|--------------------------------------------------------------------------
| Exports
|--------------------------------------------------------------------------
*/

return {

  /*
  ----------------------------------------
  Data
  ----------------------------------------
  */

  wedding,

  profile,

  /*
  ----------------------------------------
  States
  ----------------------------------------
  */

  loading,

  error,

  /*
  ----------------------------------------
  Actions
  ----------------------------------------
  */

  refresh,

  saveWedding,

  saveProfile,

  savePassword,

};

};

export default useSettings;