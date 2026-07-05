/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * GuestCounter.jsx
 *
 * Description:
 * Wedding Guest Counter
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import styles from "./GuestCounter.module.css";

const GuestCounter = ({
  value,
  disabled,
  incrementGuest,
  decrementGuest,
  error,
}) => {
  return (
    <div className={styles.container}>
      {/* ===================================== */}
      {/* Label */}
      {/* ===================================== */}

      <label className={styles.label}>
        Number of Guests
      </label>

      {/* ===================================== */}
      {/* Counter */}
      {/* ===================================== */}

      <div
        className={`${styles.counter} ${
          disabled ? styles.disabled : ""
        }`}
      >
        <button
          type="button"
          onClick={decrementGuest}
          disabled={
            disabled || value <= 1
          }
        >
          −
        </button>

        <span className={styles.value}>
          {disabled ? 0 : value}
        </span>

        <button
          type="button"
          onClick={incrementGuest}
          disabled={
            disabled || value >= 5
          }
        >
          +
        </button>
      </div>

      {/* ===================================== */}
      {/* Note */}
      {/* ===================================== */}

      <small className={styles.note}>
        {disabled
          ? "Guest count is not applicable."
          : "Maximum of 5 guests."}
      </small>

      {/* ===================================== */}
      {/* Error */}
      {/* ===================================== */}

      {error && (
        <small className={styles.error}>
          {error}
        </small>
      )}
    </div>
  );
};

export default GuestCounter;