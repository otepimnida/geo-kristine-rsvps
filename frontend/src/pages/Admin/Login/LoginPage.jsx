/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * LoginPage.jsx
 *
 * Description:
 * Admin Login Page
 *
 * Connects:
 * - LoginCard
 * - useLoginForm
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import styles from "./LoginPage.module.css";

import { LoginCard } from "./components";

import useLoginForm from "../../../hooks/forms/useLoginForm";

const LoginPage = () => {

  const {

    formData,

    errors,

    loading,

    handleChange,

    submitForm,

  } = useLoginForm();

  /*
  |--------------------------------------------------------------------------
  | Handle Submit
  |--------------------------------------------------------------------------
  */

  const handleSubmit = async (event) => {

    event.preventDefault();

    await submitForm();

  };

  return (

    <main className={styles.page}>

      <div className={styles.overlay} />

      <section className={styles.container}>

        <LoginCard

          formData={formData}

          errors={errors}

          loading={loading}

          handleChange={handleChange}

          handleSubmit={handleSubmit}

        />

      </section>

    </main>

  );

};

export default LoginPage;