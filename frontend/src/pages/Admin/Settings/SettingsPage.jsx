/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * SettingsPage.jsx
 *
 * Description:
 * Administrator Settings
 *
 * Responsibilities:
 * - Manage Wedding Information
 * - Manage Administrator Profile
 * - Manage Password
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 3.0.0
 * ==========================================================
 */

import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";

import useSettings from "../../../hooks/settings/useSettings";

import styles from "./SettingsPage.module.css";

import {

  SettingsHeader,

  AdminProfileCard,

  WeddingInfoCard,

  SecurityCard,

  SystemInfoCard,

} from "./components";

const SettingsPage = () => {

  /*
  |--------------------------------------------------------------------------
  | Settings Hook
  |--------------------------------------------------------------------------
  */

  const {

    wedding,

    profile,

    loading,

    error,

    saveWedding,

    saveProfile,

    savePassword,

  } = useSettings();

  /*
  |--------------------------------------------------------------------------
  | Save All
  |--------------------------------------------------------------------------
  |
  | This will call each card's save
  | function when backend integration
  | of the individual forms is completed.
  |
  */

  const handleSave = async () => {

    console.log(
      "Save Settings"
    );

  };

  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  if (loading) {

    return (

      <DashboardLayout>

        <section className={styles.page}>

          <div className={styles.loading}>

            Loading settings...

          </div>

        </section>

      </DashboardLayout>

    );

  }

  /*
  |--------------------------------------------------------------------------
  | Error
  |--------------------------------------------------------------------------
  */

  if (error) {

    return (

      <DashboardLayout>

        <section className={styles.page}>

          <div className={styles.error}>

            <h3>

              Unable to load settings

            </h3>

            <p>

              {error}

            </p>

          </div>

        </section>

      </DashboardLayout>

    );

  }

  return (

    <DashboardLayout>

      <section className={styles.page}>

        <div className={styles.content}>          {/* ======================================
              Header
          ====================================== */}

          <SettingsHeader />

          {/* ======================================
              Administrator Profile
          ====================================== */}

          <AdminProfileCard
            admin={profile}
            loading={loading}
            onSave={saveProfile}
          />

          {/* ======================================
              Wedding Information
          ====================================== */}

          <WeddingInfoCard
            wedding={wedding}
            loading={loading}
            onSave={saveWedding}
          />

          {/* ======================================
              Security
          ====================================== */}

          <SecurityCard
            loading={loading}
            onSave={savePassword}
          />

          {/* ======================================
              System Information
          ====================================== */}

          <SystemInfoCard />

        </div>

      </section>

    </DashboardLayout>

  );

};

export default SettingsPage;