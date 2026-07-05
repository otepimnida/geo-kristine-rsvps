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
 * - Reuse Dashboard StatisticsGrid
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.1.0
 * ==========================================================
 */

import StatisticGrid from "../../../Dashboard/components/StatisticsGrid/StatisticGrid";

const RSVPStatistics = ({ statistics }) => {
  return (
    <StatisticGrid
      dashboard={{
        statistics,
      }}
    />
  );
};

export default RSVPStatistics;