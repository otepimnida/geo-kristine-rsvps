/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * RSVPPage.jsx
 *
 * Description:
 * Main container for the RSVP page.
 * Connects the UI with the RSVP hook.
 *
 * Dependencies:
 * - RSVPCard
 * - useRSVPForm
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import styles from "./RSVPPage.module.css";

import { RSVPCard } from "./components";

import useRSVPForm from "../../hooks/forms/useRSVPForm";

const RSVPPage = () => {
  const {
    formData,
    errors,
    loading,
    handleChange,
    handleAttendance,
    incrementGuest,
    decrementGuest,
    submitForm,
  } = useRSVPForm();

  const handleSubmit = async (event) => {
    event.preventDefault();

    await submitForm();
  };

  return (
    <main className={styles.page}>
      <div className={styles.overlay} />

      <section className={styles.container}>
        <RSVPCard
          formData={formData}
          errors={errors}
          loading={loading}
          handleChange={handleChange}
          handleAttendance={handleAttendance}
          incrementGuest={incrementGuest}
          decrementGuest={decrementGuest}
          handleSubmit={handleSubmit}
        />
      </section>
    </main>
  );
};

export default RSVPPage;