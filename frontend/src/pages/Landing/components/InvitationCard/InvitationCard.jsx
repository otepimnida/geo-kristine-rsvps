/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * InvitationCard.jsx
 *
 * Description:
 * Premium Wedding Invitation Card
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 3.0.0
 * ==========================================================
 */

import { useNavigate } from "react-router-dom";

import { Button } from "../../../../components/ui";

import styles from "./InvitationCard.module.css";

import {
  background,
  floralTop,
  invitationText,
  logo,
  rings,
} from "../../assets";

const InvitationCard = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.wrapper}>
      <div className={styles.invitation}>
        {/* Background */}
        <img
          src={background}
          alt="Geo and Kristine"
          className={styles.layer}
        />

        {/* Floral Decoration */}
        <img
          src={floralTop}
          alt=""
          className={styles.layer}
        />

        {/* Invitation Text */}
        <img
          src={invitationText}
          alt="Invitation Details"
          className={styles.layer}
        />

        {/* Couple Logo */}
        <img
          src={logo}
          alt="Geo & Kristine"
          className={styles.layer}
        />

        {/* Wedding Rings */}
        <img
          src={rings}
          alt="Wedding Rings"
          className={styles.layer}
        />

        {/* Open Button */}
        <div className={styles.buttonContainer}>
          <Button
            onClick={() => navigate("/rsvp")}
          >
            OPEN
          </Button>
        </div>
      </div>
    </section>
  );
};

export default InvitationCard;