/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * RSVPCard.jsx
 *
 * Description:
 * Main RSVP Form Card
 *
 * Responsibilities:
 * - Display RSVP Form
 * - Handle Form Submission
 * - Collect Guest Information
 * - Attendance Selection
 * - Wedding Wishes
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 3.0.0
 * ==========================================================
 */

import styles from "./RSVPCard.module.css";

import RSVPInput from "../RSVPInput/RSVPInput";
import AttendanceSelector from "../AttendanceSelector/AttendanceSelector";
import MessageField from "../MessageField/MessageField";
import SubmitButton from "../SubmitButton/SubmitButton";

const RSVPCard = ({
  formData,
  errors,
  loading,

  handleChange,
  handleAttendance,

  handleSubmit,
}) => {
  return (
    <section className={styles.card}>
      {/* ==========================================
          Header
      ========================================== */}

      <header className={styles.header}>
        <p className={styles.overline}>
          Geo & Kristine
        </p>

        <h1 className={styles.title}>
          Confirm Your Attendance
        </h1>

        <p className={styles.description}>
          We are truly honored to celebrate
          one of the most meaningful moments
          of our lives with you.
        </p>
      </header>

      {/* ==========================================
          RSVP Form
      ========================================== */}

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        {/* ==========================
            Full Name
        ========================== */}

        <RSVPInput
          label="Full Name"
          name="full_name"
          value={formData.full_name}
          placeholder="Enter your full name"
          required
          error={errors.full_name}
          onChange={handleChange}
        />

        {/* ==========================
            Email Address
        ========================== */}

        <RSVPInput
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email address"
          required
          error={errors.email}
          onChange={handleChange}
        />

        {/* ==========================
            Attendance
        ========================== */}

        <AttendanceSelector
          value={formData.attendance}
          error={errors.attendance}
          onChange={handleAttendance}
        />

        {/* ==========================
            Wedding Wishes
        ========================== */}

        <MessageField
          value={formData.message}
          error={errors.message}
          onChange={handleChange}
        />

        {/* ==========================
            Submit
        ========================== */}

        <SubmitButton
          loading={loading}
        />
      </form>
    </section>
  );
};

export default RSVPCard;