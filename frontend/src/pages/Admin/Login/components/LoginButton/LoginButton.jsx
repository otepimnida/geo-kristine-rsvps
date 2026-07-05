/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * LoginButton.jsx
 *
 * Description:
 * Admin Login Button
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

import styles from "./LoginButton.module.css";

const LoginButton = ({
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

          Signing In...
        </>
      ) : (
        "Sign In"
      )}
    </button>
  );
};

export default LoginButton;