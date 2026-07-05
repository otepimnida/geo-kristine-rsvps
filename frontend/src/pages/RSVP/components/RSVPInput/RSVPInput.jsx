/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * RSVPInput.jsx
 *
 * Description:
 * Reusable RSVP Input Component
 *
 * Dependencies:
 * RSVPInput.module.css
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import styles from "./RSVPInput.module.css";

const RSVPInput = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  required = false,
  disabled = false,
  error = "",
  onChange,
}) => {
  return (
    <div className={styles.group}>
      {/* ===================================== */}
      {/* Label */}
      {/* ===================================== */}

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

      {/* ===================================== */}
      {/* Input */}
      {/* ===================================== */}

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        className={`${styles.input} ${
          error ? styles.errorInput : ""
        }`}
        onChange={onChange}
      />

      {/* ===================================== */}
      {/* Error */}
      {/* ===================================== */}

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

export default RSVPInput;