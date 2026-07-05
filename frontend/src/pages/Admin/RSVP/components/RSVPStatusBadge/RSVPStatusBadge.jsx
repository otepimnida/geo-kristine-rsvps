/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * RSVPStatusBadge.jsx
 *
 * Description:
 * Reusable RSVP Status Badge
 *
 * Responsibilities:
 * - Display RSVP Status
 * - Consistent Colors
 * - Reusable Across Admin Panel
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

import styles from "./RSVPStatusBadge.module.css";

const RSVPStatusBadge = ({
  status = "Pending",
}) => {
  const normalizedStatus =
    status.trim().toLowerCase();

  let badgeClass = styles.pending;

  switch (normalizedStatus) {
    case "attending":
      badgeClass =
        styles.attending;
      break;

    case "declined":
      badgeClass =
        styles.declined;
      break;

    case "pending":
    default:
      badgeClass =
        styles.pending;
      break;
  }

  return (
    <span
      className={`${styles.badge} ${badgeClass}`}
    >
      {status}
    </span>
  );
};

export default RSVPStatusBadge;