/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * LandingPage.jsx
 *
 * Description:
 * Premium Wedding Invitation Landing Page
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 3.0.0
 * ==========================================================
 */

import styles from "./LandingPage.module.css";

import { background } from "./assets";

import { InvitationCard } from "./components";

const LandingPage = () => {
  return (
    <main className={styles.page}>
      {/* Blurred Background */}

      <div
        className={styles.background}
        style={{
          backgroundImage: `url(${background})`,
        }}
      />

      {/* White Overlay */}

      <div className={styles.overlay} />

      {/* Invitation */}

      <div className={styles.content}>
        <InvitationCard />
      </div>
    </main>
  );
};

export default LandingPage;