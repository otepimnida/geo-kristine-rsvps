/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * useRSVPForm.js
 *
 * Description:
 * Centralized RSVP Form Hook
 *
 * Responsibilities:
 * - Form State
 * - Validation
 * - Attendance Logic
 * - API Submission
 * - Loading State
 * - Toast Notifications
 * - Reset Form
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 3.0.0
 * ==========================================================
 */

import { useState } from "react";
import toast from "react-hot-toast";

import validateRSVP from "../../utils/validators/rsvpValidation";
import { submitRSVP } from "../../services/rsvpService";

/*
|--------------------------------------------------------------------------
| Initial Form
|--------------------------------------------------------------------------
*/

const INITIAL_FORM = {
  full_name: "",
  email: "",
  contact_number: "",
  attendance: true,
  message: "",
};

const useRSVPForm = () => {
  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [formData, setFormData] =
    useState(INITIAL_FORM);

  const [errors, setErrors] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | Clear Error
  |--------------------------------------------------------------------------
  */

  const clearError = (field) => {
    if (!errors[field]) return;

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Handle Text Inputs
  |--------------------------------------------------------------------------
  */

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    clearError(name);
  };

  /*
  |--------------------------------------------------------------------------
  | Attendance
  |--------------------------------------------------------------------------
  */

  const handleAttendance = (
    attendance
  ) => {
    setFormData((previous) => ({
      ...previous,
      attendance,
    }));

    clearError("attendance");
  };

  /*
  |--------------------------------------------------------------------------
  | Reset Form
  |--------------------------------------------------------------------------
  */

  const resetForm = () => {
    setFormData(INITIAL_FORM);

    setErrors({});
  };

  /*
  |--------------------------------------------------------------------------
  | Validation
  |--------------------------------------------------------------------------
  */

  const validate = () => {
    const validationErrors =
      validateRSVP(formData);

    setErrors(validationErrors);

    return (
      Object.keys(validationErrors)
        .length === 0
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Submit Form
  |--------------------------------------------------------------------------
  */

  const submitForm = async () => {
    if (!validate()) {
      return false;
    }

    try {
      setLoading(true);

      await submitRSVP(formData);

      toast.success(
        "Thank you! Your RSVP has been submitted successfully."
      );

      resetForm();

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to submit RSVP."
      );

      return false;
    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Exports
  |--------------------------------------------------------------------------
  */

  return {
    formData,

    errors,

    loading,

    handleChange,

    handleAttendance,

    submitForm,

    resetForm,
  };
};

export default useRSVPForm;