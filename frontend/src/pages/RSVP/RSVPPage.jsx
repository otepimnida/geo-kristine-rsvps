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
 * 3.0.0
 * ==========================================================
 */

import styles from "./RSVPPage.module.css";

import { RSVPCard } from "./components";

import useRSVPForm from "../../hooks/forms/useRSVPForm";

const RSVPPage = () => {

  /*
  |--------------------------------------------------------------------------
  | RSVP Hook
  |--------------------------------------------------------------------------
  */

  const {

    formData,

    errors,

    loading,

    handleChange,

    handleAttendance,

    submitForm,

  } = useRSVPForm();

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (event) => {

    event.preventDefault();

    await submitForm();

  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

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

          handleSubmit={handleSubmit}

        />

      </section>

    </main>

  );

};

export default RSVPPage;