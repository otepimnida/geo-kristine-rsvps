/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * SubmitButton.jsx
 *
 * Description:
 * RSVP Submit Button
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import styles from "./SubmitButton.module.css";

const SubmitButton = ({
  loading = false,
}) => {
  return (
    <button
      type="submit"
      className={styles.button}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className={styles.spinner}></span>

          Sending RSVP...
        </>
      ) : (
        "Confirm Attendance"
      )}
    </button>
  );
};

export default SubmitButton;