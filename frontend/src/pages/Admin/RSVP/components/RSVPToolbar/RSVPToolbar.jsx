/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * RSVPToolbar.jsx
 *
 * Description:
 * RSVP Management Toolbar
 *
 * Responsibilities:
 * - Live Search
 * - Status Filter
 * - Refresh Button
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import {
  HiMagnifyingGlass,
  HiArrowPath,
} from "react-icons/hi2";

import styles from "./RSVPToolbar.module.css";

const RSVPToolbar = ({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  onRefresh,
  loading = false,
}) => {
  return (
    <section className={styles.toolbar}>
      {/* Search */}

      <div className={styles.search}>
        <HiMagnifyingGlass />

        <input
          type="text"
          placeholder="Search guest name or email..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
        />
      </div>

      {/* Filter */}

      <div className={styles.filters}>
        {[
          "All",
          "Attending",
          "Declined",
        ].map((status) => (
          <button
            key={status}
            type="button"
            onClick={() =>
              setStatusFilter(status)
            }
            className={
              statusFilter === status
                ? styles.active
                : ""
            }
          >
            {status}
          </button>
        ))}
      </div>

      {/* Refresh */}

      <button
        type="button"
        className={styles.refresh}
        onClick={onRefresh}
        disabled={loading}
      >
        <HiArrowPath />

        {loading
          ? "Refreshing..."
          : "Refresh"}
      </button>
    </section>
  );
};

export default RSVPToolbar;