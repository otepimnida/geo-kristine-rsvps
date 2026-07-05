/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * SecurityCard.jsx
 *
 * Description:
 * Administrator Security Card
 *
 * Responsibilities:
 * - Change Administrator Password
 * - Show / Hide Password
 * - Connected to Backend
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import {
  useState,
} from "react";

import {
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";

import styles from "./SecurityCard.module.css";

const SecurityCard = ({
  loading = false,
  onSave,
}) => {

  /*
  |--------------------------------------------------------------------------
  | Password Fields
  |--------------------------------------------------------------------------
  */

  const [

    currentPassword,

    setCurrentPassword,

  ] = useState("");

  const [

    newPassword,

    setNewPassword,

  ] = useState("");

  const [

    confirmPassword,

    setConfirmPassword,

  ] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Password Visibility
  |--------------------------------------------------------------------------
  */

  const [

    showCurrent,

    setShowCurrent,

  ] = useState(false);

  const [

    showNew,

    setShowNew,

  ] = useState(false);

  const [

    showConfirm,

    setShowConfirm,

  ] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Save
  |--------------------------------------------------------------------------
  */

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      if (!onSave) return;

      const success =
        await onSave({

          current_password:
            currentPassword,

          new_password:
            newPassword,

          confirm_password:
            confirmPassword,

        });

      if (success) {

        setCurrentPassword("");

        setNewPassword("");

        setConfirmPassword("");

      }

    };

  return (

    <section className={styles.card}>

      {/* ======================================
          Header
      ====================================== */}

      <div className={styles.header}>

        <h2>

          Security

        </h2>

        <p>

          Change your administrator
          password.

        </p>

      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >

        {/* Current Password */}

        <div className={styles.group}>

          <label>

            Current Password

          </label>

          <div className={styles.inputWrapper}>

            <HiOutlineLockClosed
              className={styles.leftIcon}
            />

            <input
              type={
                showCurrent
                  ? "text"
                  : "password"
              }
              value={currentPassword}
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
              placeholder="Current password"
            />

            <button
              type="button"
              className={styles.eyeButton}
              onClick={() =>
                setShowCurrent(
                  !showCurrent
                )
              }
            >

              {showCurrent
                ? <HiOutlineEyeSlash />
                : <HiOutlineEye />}

            </button>

          </div>

        </div>

        {/* New Password */}

        <div className={styles.group}>

          <label>

            New Password

          </label>

          <div className={styles.inputWrapper}>

            <HiOutlineLockClosed
              className={styles.leftIcon}
            />

            <input
              type={
                showNew
                  ? "text"
                  : "password"
              }
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              placeholder="New password"
            />

            <button
              type="button"
              className={styles.eyeButton}
              onClick={() =>
                setShowNew(
                  !showNew
                )
              }
            >

              {showNew
                ? <HiOutlineEyeSlash />
                : <HiOutlineEye />}

            </button>

          </div>

        </div>

        {/* Confirm Password */}

        <div className={styles.group}>

          <label>

            Confirm Password

          </label>

          <div className={styles.inputWrapper}>

            <HiOutlineLockClosed
              className={styles.leftIcon}
            />

            <input
              type={
                showConfirm
                  ? "text"
                  : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm password"
            />

            <button
              type="button"
              className={styles.eyeButton}
              onClick={() =>
                setShowConfirm(
                  !showConfirm
                )
              }
            >

              {showConfirm
                ? <HiOutlineEyeSlash />
                : <HiOutlineEye />}

            </button>

          </div>

        </div>        {/* ======================================
            Footer
        ====================================== */}

        <div className={styles.footer}>

          <button
            type="submit"
            className={styles.saveButton}
            disabled={loading}
          >

            {loading
              ? "Updating Password..."
              : "Change Password"}

          </button>

        </div>

      </form>

    </section>

  );

};

export default SecurityCard;