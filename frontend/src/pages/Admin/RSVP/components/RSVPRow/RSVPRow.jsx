/**
 * ==========================================================
 * RSVP Table Row
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

  return (
    <tr className={styles.row}>

      <td>

        <div className={styles.guest}>
          <span className={styles.name}>
            {guest.fullName}
          </span>
        </div>

      </td>

      <td>
        {guest.email}
      </td>

      <td>
        {guest.contactNumber}
      </td>

      <td className={styles.center}>

        <RSVPStatusBadge
          status={guest.status}
        />

      </td>

      <td className={styles.message}>
        {guest.message || "—"}
      </td>

      <td className={styles.center}>
        {guest.createdAt}
      </td>

      <td>

        <div className={styles.actions}>

          <button
            className={`${styles.button} ${styles.view}`}
            onClick={() => onView(guest)}
          >
            <HiEye />
          </button>

          <button
            className={`${styles.button} ${styles.edit}`}
            onClick={() => onEdit(guest)}
          >
            <HiPencilSquare />
          </button>

          <button
            className={`${styles.button} ${styles.delete}`}
            onClick={() => onDelete(guest)}
          >
            <HiTrash />
          </button>

        </div>

      </td>

    </tr>
  );
};

export default RSVPRow;