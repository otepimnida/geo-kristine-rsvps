/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * SystemInfoCard.jsx
 *
 * Description:
 * System Information Card
 *
 * Responsibilities:
 * - Display System Information
 * - Display Technology Stack
 * - Display Application Version
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

import {
  HiOutlineCodeBracket,
  HiOutlineCircleStack,
  HiOutlineCloud,
  HiOutlineCpuChip,
  HiOutlineGlobeAlt,
  HiOutlineServer,
} from "react-icons/hi2";

import styles from "./SystemInfoCard.module.css";

const SystemInfoCard = () => {

  const systemInfo = [

    {
      id: 1,
      icon: HiOutlineGlobeAlt,
      label: "Frontend",
      value: "React + Vite",
    },

    {
      id: 2,
      icon: HiOutlineServer,
      label: "Backend",
      value: "Node.js + Express",
    },

    {
      id: 3,
      icon: HiOutlineCircleStack,
      label: "Database",
      value: "Supabase PostgreSQL",
    },

    {
      id: 4,
      icon: HiOutlineCloud,
      label: "Storage",
      value: "Cloudinary",
    },

    {
      id: 5,
      icon: HiOutlineCodeBracket,
      label: "Version",
      value: "v1.0.0",
    },

    {
      id: 6,
      icon: HiOutlineCpuChip,
      label: "Environment",
      value: "Production Ready",
    },

  ];

  return (

    <section className={styles.card}>

      {/* ======================================
          Header
      ====================================== */}

      <div className={styles.header}>

        <h2>

          System Information

        </h2>

        <p>

          Overview of the technologies
          and current application
          environment.

        </p>

      </div>

      {/* ======================================
          Content
      ====================================== */}

      <div className={styles.grid}>

        {systemInfo.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.id}
              className={styles.item}
            >

              <div className={styles.icon}>

                <Icon />

              </div>

              <div className={styles.info}>

                <label>

                  {item.label}

                </label>

                <span>

                  {item.value}

                </span>

              </div>

            </div>

          );

        })}

      </div>

    </section>

  );

};

export default SystemInfoCard;