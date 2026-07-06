/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * RSVPStatistics.jsx
 *
 * Description:
 * RSVP Statistics Overview
 *
 * Responsibilities:
 * - Display RSVP Summary
 * - Total RSVPs
 * - Attending
 * - Declined
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 3.0.0
 * ==========================================================
 */

import {
  HiOutlineClipboardDocumentList,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
} from "react-icons/hi2";

import styles from "./RSVPStatistics.module.css";

const RSVPStatistics = ({ statistics }) => {

  const cards = [

    {
      title: "Total RSVPs",
      value: statistics?.totalRSVPs ?? 0,
      icon: <HiOutlineClipboardDocumentList />,
      className: styles.total,
    },

    {
      title: "Attending",
      value: statistics?.attending ?? 0,
      icon: <HiOutlineCheckCircle />,
      className: styles.attending,
    },

    {
      title: "Declined",
      value: statistics?.declined ?? 0,
      icon: <HiOutlineXCircle />,
      className: styles.declined,
    },

  ];

  return (

    <section className={styles.grid}>

      {cards.map((card) => (

        <article
          key={card.title}
          className={`${styles.card} ${card.className}`}
        >

          <div className={styles.icon}>

            {card.icon}

          </div>

          <div className={styles.content}>

            <h3>

              {card.title}

            </h3>

            <h2>

              {card.value}

            </h2>

          </div>

        </article>

      ))}

    </section>

  );

};

export default RSVPStatistics;