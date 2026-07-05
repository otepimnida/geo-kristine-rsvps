/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * RSVPManagementPage.jsx
 *
 * Description:
 * RSVP Management
 *
 * Responsibilities:
 * - View RSVP
 * - Edit RSVP
 * - Delete RSVP
 * - Live Search
 * - Live Filters
 * - Live Statistics
 * - Live Refresh
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 7.0.0
 * ==========================================================
 */

import { useState } from "react";

import DashboardLayout from "../../../layouts/DashboardLayout/DashboardLayout";

import useRSVP from "../../../hooks/rsvp/useRSVP";

import styles from "./RSVPManagementPage.module.css";

import {

  RSVPToolbar,

  RSVPStatistics,

  RSVPTable,

  RSVPDetailsDrawer,

  EditRSVPModal,

  DeleteRSVPModal,

} from "./components";

const RSVPManagementPage = () => {

  /*
  |--------------------------------------------------------------------------
  | RSVP Hook
  |--------------------------------------------------------------------------
  */

  const {

    filteredGuests,

    statistics,

    loading,

    error,

    refresh,

    search,

    setSearch,

    statusFilter,

    setStatusFilter,

  } = useRSVP();

  /*
  |--------------------------------------------------------------------------
  | View Drawer
  |--------------------------------------------------------------------------
  */

  const [

    selectedGuest,

    setSelectedGuest,

  ] = useState(null);

  const [

    drawerOpen,

    setDrawerOpen,

  ] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Edit Modal
  |--------------------------------------------------------------------------
  */

  const [

    editingGuest,

    setEditingGuest,

  ] = useState(null);

  const [

    editModalOpen,

    setEditModalOpen,

  ] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Delete Modal
  |--------------------------------------------------------------------------
  */

  const [

    deletingGuest,

    setDeletingGuest,

  ] = useState(null);

  const [

    deleteModalOpen,

    setDeleteModalOpen,

  ] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | View Guest
  |--------------------------------------------------------------------------
  */

  const handleView = (guest) => {

    setSelectedGuest(guest);

    setDrawerOpen(true);

  };

  const handleCloseDrawer = () => {

    setDrawerOpen(false);

    setSelectedGuest(null);

  };

  /*
  |--------------------------------------------------------------------------
  | Edit Guest
  |--------------------------------------------------------------------------
  */

  const handleEdit = (guest) => {

    setEditingGuest(guest);

    setEditModalOpen(true);

  };

  const handleCloseEdit = () => {

    setEditModalOpen(false);

    setEditingGuest(null);

  };

  /*
  |--------------------------------------------------------------------------
  | Delete Guest
  |--------------------------------------------------------------------------
  */

  const handleDelete = (guest) => {

    setDeletingGuest(guest);

    setDeleteModalOpen(true);

  };

  const handleCloseDelete = () => {

    setDeleteModalOpen(false);

    setDeletingGuest(null);

  };

  /*
  |--------------------------------------------------------------------------
  | Refresh After Update
  |--------------------------------------------------------------------------
  */

  const handleUpdated = async () => {

    await refresh();

    handleCloseEdit();

  };

  /*
  |--------------------------------------------------------------------------
  | Refresh After Delete
  |--------------------------------------------------------------------------
  */

  const handleDeleted = async () => {

    await refresh();

    handleCloseDelete();

  };

  return (

    <DashboardLayout>

      <section className={styles.page}>

        <header className={styles.header}>

          <div>

            <h1>

              RSVP Management

            </h1>

            <p>

              Manage guest RSVP
              submissions, attendance,
              and wedding guest
              information.

            </p>

          </div>

        </header>

        <RSVPToolbar

          search={search}

          setSearch={setSearch}

          statusFilter={statusFilter}

          setStatusFilter={setStatusFilter}

          onRefresh={refresh}

          loading={loading}

        />

        <RSVPStatistics

          statistics={statistics}

        />

        {error && (

          <div className={styles.error}>

            <h3>

              Unable to load RSVP records

            </h3>

            <p>

              {error}

            </p>

          </div>

        )}

        <RSVPTable

          guests={filteredGuests}

          loading={loading}

          onView={handleView}

          onEdit={handleEdit}

          onDelete={handleDelete}

        />        {/* ======================================
            RSVP Details Drawer
        ====================================== */}

        <RSVPDetailsDrawer
          open={drawerOpen}
          guest={selectedGuest}
          onClose={handleCloseDrawer}
        />

        {/* ======================================
            Edit RSVP Modal
        ====================================== */}

        <EditRSVPModal
          open={editModalOpen}
          guest={editingGuest}
          onClose={handleCloseEdit}
          onUpdated={handleUpdated}
        />

        {/* ======================================
            Delete RSVP Modal
        ====================================== */}

        <DeleteRSVPModal
          open={deleteModalOpen}
          guest={deletingGuest}
          onClose={handleCloseDelete}
          onDeleted={handleDeleted}
        />

      </section>

    </DashboardLayout>

  );

};

export default RSVPManagementPage;