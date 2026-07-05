/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * AttendanceSelector.jsx
 *
 * Description:
 * Wedding RSVP Attendance Selector
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import styles from "./AttendanceSelector.module.css";

const AttendanceSelector = ({
  value,
  onChange,
  error,
}) => {
  return (
    <div className={styles.container}>
      {/* ====================================== */}
      {/* Label */}
      {/* ====================================== */}

      <label className={styles.label}>
        Attendance

        <span className={styles.required}>
          *
        </span>
      </label>

      {/* ====================================== */}
      {/* Options */}
      {/* ====================================== */}

      <div className={styles.options}>
        {/* Accept */}

        <button
          type="button"
          className={`${styles.option} ${
            value === true
              ? styles.active
              : ""
          }`}
          onClick={() =>
            onChange(true)
          }
        >
          <div className={styles.radio}>
            {value === true && (
              <span
                className={styles.dot}
              />
            )}
          </div>

          <div className={styles.content}>
            <h4>
              Joyfully Accepts
            </h4>

            <p>
              I am delighted to
              celebrate with
              Geo & Kristine.
            </p>
          </div>
        </button>

        {/* Decline */}

        <button
          type="button"
          className={`${styles.option} ${
            value === false
              ? styles.active
              : ""
          }`}
          onClick={() =>
            onChange(false)
          }
        >
          <div className={styles.radio}>
            {value === false && (
              <span
                className={styles.dot}
              />
            )}
          </div>

          <div className={styles.content}>
            <h4>
              Regretfully Declines
            </h4>

            <p>
              Unfortunately,
              I won't be able
              to attend.
            </p>
          </div>
        </button>
      </div>

      {/* ====================================== */}
      {/* Error */}
      {/* ====================================== */}

      {error && (
        <small className={styles.error}>
          {error}
        </small>
      )}
    </div>
  );
};

export default AttendanceSelector;