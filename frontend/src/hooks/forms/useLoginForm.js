/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * useLoginForm.js
 *
 * Description:
 * Administrator Login Form Hook
 *
 * Responsibilities:
 * - Form State
 * - Validation
 * - Authentication
 * - Session Storage
 * - Navigation
 * - Toast Notifications
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import validateLogin from "../../utils/validators/loginValidation";

import {
  login,
  saveSession,
} from "../../services/authService";

/*
|--------------------------------------------------------------------------
| Initial Form
|--------------------------------------------------------------------------
*/

const INITIAL_FORM = {
  email: "",
  password: "",
};

const useLoginForm = () => {
  const navigate = useNavigate();

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
  | Clear Field Error
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
  | Handle Input Change
  |--------------------------------------------------------------------------
  */

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    clearError(name);
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
  | Validate Form
  |--------------------------------------------------------------------------
  */

  const validate = () => {
    const validationErrors =
      validateLogin(formData);

    setErrors(validationErrors);

    return (
      Object.keys(validationErrors)
        .length === 0
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Submit Login
  |--------------------------------------------------------------------------
  */

  const submitForm = async () => {
    if (loading) {
      return false;
    }

    if (!validate()) {
      return false;
    }

    try {
      setLoading(true);

      /*
      --------------------------------------------------------
      Authenticate Administrator
      --------------------------------------------------------
      */

      const session =
        await login(formData);

      /*
      --------------------------------------------------------
      Save Session
      --------------------------------------------------------
      */

      saveSession(session);

      /*
      --------------------------------------------------------
      Success
      --------------------------------------------------------
      */

      toast.success(
        "Welcome back, Administrator!"
      );

      resetForm();

      navigate("/admin/dashboard", {
        replace: true,
      });

      return true;

    } catch (error) {

      console.error(
        "Login Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Invalid email or password."
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
    submitForm,
    resetForm,
  };
};

export default useLoginForm;