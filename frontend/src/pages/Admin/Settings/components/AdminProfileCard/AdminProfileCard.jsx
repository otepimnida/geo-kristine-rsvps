/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * AdminProfileCard.jsx
 *
 * Description:
 * Administrator Profile Card
 *
 * Responsibilities:
 * - Display Administrator Information
 * - Edit Username
 * - Edit Email
 * - Save Administrator Profile
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
  useEffect,
} from "react";

import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

import styles from "./AdminProfileCard.module.css";

const AdminProfileCard = ({
  admin,
  loading = false,
  onSave,
}) => {

  /*
  |--------------------------------------------------------------------------
  | Form State
  |--------------------------------------------------------------------------
  */

  const [
    username,
    setUsername,
  ] = useState("");

  const [
    email,
    setEmail,
  ] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Sync Administrator
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    if (!admin) return;

    setUsername(
      admin.username || ""
    );

    setEmail(
      admin.email || ""
    );

  }, [admin]);

  /*
  |--------------------------------------------------------------------------
  | Save
  |--------------------------------------------------------------------------
  */

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      if (!onSave) return;

      await onSave({

        username:
          username.trim(),

        email:
          email.trim(),

      });

    };

  return (

    <section className={styles.card}>

      {/* ======================================
          Header
      ====================================== */}

      <div className={styles.header}>

        <h2>

          Administrator Profile

        </h2>

        <p>

          Manage your administrator
          account information.

        </p>

      </div>

      {/* ======================================
          Form
      ====================================== */}

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >

        {/* Username */}

        <div className={styles.group}>

          <label>

            Username

          </label>

          <div
            className={
              styles.inputWrapper
            }
          >

            <HiOutlineUser
              className={
                styles.icon
              }
            />

            <input
              type="text"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              placeholder="Administrator Username"
            />

          </div>

        </div>

        {/* Email */}

        <div className={styles.group}>

          <label>

            Email Address

          </label>

          <div
            className={
              styles.inputWrapper
            }
          >

            <HiOutlineEnvelope
              className={
                styles.icon
              }
            />

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Administrator Email"
            />

          </div>

        </div>

        {/* Role */}

        <div className={styles.group}>

          <label>

            Role

          </label>

          <div
            className={
              styles.readonly
            }
          >

            <HiOutlineShieldCheck
              className={
                styles.icon
              }
            />

            <span>

              {admin?.role ||
                "Administrator"}

            </span>

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
              ? "Saving..."
              : "Save Profile"}

          </button>

        </div>

      </form>

    </section>

  );

};

export default AdminProfileCard;