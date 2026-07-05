/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * LoginCard.jsx
 *
 * Description:
 * Main Admin Login Card
 *
 * Responsibilities:
 * - Render Login Form
 * - Display Validation Errors
 * - Trigger Authentication
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import styles from "./LoginCard.module.css";

import AdminInput from "../AdminInput/AdminInput";
import PasswordInput from "../PasswordInput/PasswordInput";
import LoginButton from "../LoginButton/LoginButton";

const LoginCard = ({
  formData,
  errors,
  loading,
  handleChange,
  handleSubmit,
}) => {
  return (
    <section className={styles.card}>
      {/* ========================================= */}
      {/* Header */}
      {/* ========================================= */}

      <header className={styles.header}>
        <p className={styles.overline}>
          Geo & Kristine
        </p>

        <h1 className={styles.title}>
          Administrator Login
        </h1>

        <p className={styles.description}>
          Sign in to access the Admin Dashboard
          and manage RSVP records, guests,
          analytics, and wedding information.
        </p>
      </header>

      {/* ========================================= */}
      {/* Login Form */}
      {/* ========================================= */}

      <form
        className={styles.form}
        onSubmit={handleSubmit}
        noValidate
      >
        <AdminInput
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email address"
          autoComplete="email"
          required
          error={errors.email}
          onChange={handleChange}
        />

        <PasswordInput
          label="Password"
          name="password"
          value={formData.password}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          error={errors.password}
          onChange={handleChange}
        />

        <LoginButton
          loading={loading}
        />
      </form>
    </section>
  );
};

export default LoginCard;