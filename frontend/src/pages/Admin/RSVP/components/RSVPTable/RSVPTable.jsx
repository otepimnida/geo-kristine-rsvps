/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * RSVPTable.jsx
 *
 * Description:
 * Premium RSVP Management Table
 *
 * Responsibilities:
 * - Display RSVP Records
 * - Loading State
 * - Empty State
 * - Responsive Table
 * - Integrates RSVPRow
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import RSVPRow from "../RSVPRow/RSVPRow";

import styles from "./RSVPTable.module.css";

const RSVPTable = ({
  guests = [],
  loading = false,
  onView,
  onEdit,
  onDelete,
}) => {

  /*
  |--------------------------------------------------------------------------
  | Loading State
  |--------------------------------------------------------------------------
  */

  if (loading) {

    return (

      <section className={styles.wrapper}>

        <div className={styles.loading}>

          Loading RSVP records...

        </div>

      </section>

    );

  }

  /*
  |--------------------------------------------------------------------------
  | Empty State
  |--------------------------------------------------------------------------
  */

  if (!guests.length) {

    return (

      <section className={styles.wrapper}>

        <div className={styles.empty}>

          <h3>

            No RSVP Records Found

          </h3>

          <p>

            Guest RSVP submissions will
            appear here once guests begin
            responding to your invitation.

          </p>

        </div>

      </section>

    );

  }

  /*
  |--------------------------------------------------------------------------
  | Table
  |--------------------------------------------------------------------------
  */

  return (

    <section className={styles.wrapper}>

      <table className={styles.table}>

        <thead>
          <tr>

            <th>Guest</th>

            <th>Email</th>

            <th>Contact Number</th>

            <th>Status</th>

            <th>Message</th>

            <th>Submitted</th>

            <th>Actions</th>

          </tr>
        </thead>

        <tbody>

          {guests.map((guest) => (

            <RSVPRow

              key={guest.id}

              guest={guest}

              onView={onView}

              onEdit={onEdit}

              onDelete={onDelete}

            />

          ))}

        </tbody>

      </table>

    </section>

  );

};

export default RSVPTable;