/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * PasswordInput.jsx
 *
 * Description:
 * Reusable Password Input Component
 *
 * Features:
 * - Show / Hide Password
 * - Validation Support
 * - Luxury Wedding Theme
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

import { useState } from "react";

import styles from "./PasswordInput.module.css";

const PasswordInput = ({
  label,
  name,
  value,
  placeholder,
  required = false,
  disabled = false,
  autoComplete = "current-password",
  error = "",
  onChange,
}) => {

  const [showPassword, setShowPassword] =
    useState(false);

  const togglePassword = () => {
    setShowPassword(
      (previous) => !previous
    );
  };

  return (
    <div className={styles.group}>

      {/* =============================== */}
      {/* Label */}
      {/* =============================== */}

      <label
        htmlFor={name}
        className={styles.label}
      >
        {label}

        {required && (
          <span className={styles.required}>
            *
          </span>
        )}
      </label>

      {/* =============================== */}
      {/* Password */}
      {/* =============================== */}

      <div className={styles.wrapper}>

        <input
          id={name}
          name={name}
          type={
            showPassword
              ? "text"
              : "password"
          }
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`${styles.input} ${
            error
              ? styles.errorInput
              : ""
          }`}
          onChange={onChange}
        />

        <button
          type="button"
          className={styles.toggle}
          onClick={togglePassword}
          aria-label={
            showPassword
              ? "Hide password"
              : "Show password"
          }
        >
          {showPassword
            ? "Hide"
            : "Show"}
        </button>

      </div>

      {/* =============================== */}
      {/* Error */}
      {/* =============================== */}

      <div className={styles.errorContainer}>
        {error && (
          <small className={styles.error}>
            {error}
          </small>
        )}
      </div>

    </div>
  );
};

export default PasswordInput;