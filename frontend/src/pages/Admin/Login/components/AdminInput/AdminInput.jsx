/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * AdminInput.jsx
 *
 * Description:
 * Reusable Admin Input Component
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

import styles from "./AdminInput.module.css";

const AdminInput = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  required = false,
  disabled = false,
  autoComplete = "off",
  error = "",
  onChange,
}) => {
  return (
    <div className={styles.group}>
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

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        className={`${styles.input} ${
          error
            ? styles.errorInput
            : ""
        }`}
        onChange={onChange}
      />

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

export default AdminInput;