/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * RSVPRow.jsx
 *
 * Description:
 * RSVP Table Row
 *
 * Responsibilities:
 * - Display RSVP Information
 * - View RSVP
 * - Edit RSVP
 * - Delete RSVP
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 5.0.0
 * ==========================================================
 */

import {
  HiEye,
  HiPencilSquare,
  HiTrash,
} from "react-icons/hi2";

import RSVPStatusBadge from "../RSVPStatusBadge/RSVPStatusBadge";

import styles from "./RSVPRow.module.css";

const RSVPRow = ({
  guest,
  onView,
  onEdit,
  onDelete,
}) => {

  /*
  |--------------------------------------------------------------------------
  | Actions
  |--------------------------------------------------------------------------
  */

  const handleView = () => {

    if (onView) {

      onView(guest);

    }

  };

  const handleEdit = () => {

    if (onEdit) {

      onEdit(guest);

    }

  };

  const handleDelete = () => {

    if (onDelete) {

      onDelete(guest);

    }

  };

  return (

    <tr className={styles.row}>

      {/* ==========================================
          Guest
      ========================================== */}

      <td>

        <div className={styles.guest}>

          <span className={styles.name}>

            {guest.fullName}

          </span>

        </div>

      </td>

      {/* ==========================================
          Contact
      ========================================== */}

      <td>

        <span className={styles.email}>

          {guest.email}

        </span>

      </td>

      {/* ==========================================
          Attendance
      ========================================== */}

      <td className={styles.center}>

        <RSVPStatusBadge
          status={guest.status}
        />

      </td>

      {/* ==========================================
          Submitted
      ========================================== */}

      <td className={styles.center}>

        {guest.createdAt}

      </td>

      {/* ==========================================
          Actions
      ========================================== */}

      <td>

        <div className={styles.actions}>

          {/* View */}

          <button
            type="button"
            className={`${styles.button} ${styles.view}`}
            onClick={handleView}
            title="View RSVP"
            aria-label="View RSVP"
          >

            <HiEye />

          </button>

          {/* Edit */}

          <button
            type="button"
            className={`${styles.button} ${styles.edit}`}
            onClick={handleEdit}
            title="Edit RSVP"
            aria-label="Edit RSVP"
          >

            <HiPencilSquare />

          </button>

          {/* Delete */}

          <button
            type="button"
            className={`${styles.button} ${styles.delete}`}
            onClick={handleDelete}
            title="Delete RSVP"
            aria-label="Delete RSVP"
          >

            <HiTrash />

          </button>

        </div>

      </td>

    </tr>

  );

};

export default RSVPRow;