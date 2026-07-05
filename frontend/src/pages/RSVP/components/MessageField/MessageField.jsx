/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * MessageField.jsx
 *
 * Description:
 * Wedding Wishes Message Field
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import styles from "./MessageField.module.css";

const MAX_CHARACTERS = 300;

const MessageField = ({
  value,
  error,
  onChange,
}) => {
  return (
    <div className={styles.container}>
      {/* ====================================== */}
      {/* Label */}
      {/* ====================================== */}

      <label
        htmlFor="message"
        className={styles.label}
      >
        Wedding Wishes
      </label>

      {/* ====================================== */}
      {/* Textarea */}
      {/* ====================================== */}

      <textarea
        id="message"
        name="message"
        rows={5}
        value={value}
        onChange={onChange}
        maxLength={MAX_CHARACTERS}
        placeholder="Leave a heartfelt message for Geo & Kristine..."
        className={`${styles.textarea} ${
          error ? styles.errorInput : ""
        }`}
      />

      {/* ====================================== */}
      {/* Footer */}
      {/* ====================================== */}

      <div className={styles.footer}>
        {error ? (
          <small className={styles.error}>
            {error}
          </small>
        ) : (
          <span />
        )}

        <small className={styles.counter}>
          {value.length} / {MAX_CHARACTERS}
        </small>
      </div>
    </div>
  );
};

export default MessageField;