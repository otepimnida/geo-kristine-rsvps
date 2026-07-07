/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * RSVPDetailsDrawer.jsx
 *
 * Description:
 * RSVP Details Drawer
 *
 * Responsibilities:
 * - Display complete RSVP information
 * - Read-only guest information
 *
 * Version:
 * 2.1.0
 * ==========================================================
 */

import {
  HiOutlineXMark,
  HiEnvelope,
  HiPhone,
  HiCalendarDays,
  HiChatBubbleLeftRight,
} from "react-icons/hi2";

import RSVPStatusBadge from "../RSVPStatusBadge/RSVPStatusBadge";

import styles from "./RSVPDetailsDrawer.module.css";

const RSVPDetailsDrawer = ({
  open,
  guest,
  onClose,
}) => {
  if (!open || !guest) {
    return null;
  }

  return (
    <>
      <div
        className={styles.overlay}
        onClick={onClose}
      />

      <aside className={styles.drawer}>
        <header className={styles.header}>
          <div>
            <h2>RSVP Details</h2>
            <p>Guest Information</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={styles.close}
          >
            <HiOutlineXMark />
          </button>
        </header>

        <section className={styles.body}>

          <div className={styles.card}>
            <label>Full Name</label>
            <span>{guest.fullName}</span>
          </div>

          <div className={styles.card}>
            <label>
              <HiEnvelope />
              Email
            </label>

            <span>{guest.email}</span>
          </div>

          <div className={styles.card}>
            <label>
              <HiPhone />
              Contact Number
            </label>

            <span>
              {guest.contactNumber}
            </span>
          </div>

          <div className={styles.card}>
            <label>Attendance</label>

            <RSVPStatusBadge
              status={guest.status}
            />
          </div>

          <div className={styles.card}>
            <label>
              <HiChatBubbleLeftRight />
              Message
            </label>

            <p>
              {guest.message ||
                "No message provided."}
            </p>
          </div>

          <div className={styles.card}>
            <label>
              <HiCalendarDays />
              Submitted
            </label>

            <span>
              {guest.createdAt}
            </span>
          </div>

        </section>

        <footer className={styles.footer}>
          <button
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </aside>
    </>
  );
};

export default RSVPDetailsDrawer;