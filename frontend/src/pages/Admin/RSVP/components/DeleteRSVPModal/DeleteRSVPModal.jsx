/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * DeleteRSVPModal.jsx
 *
 * Description:
 * Premium Delete RSVP Confirmation Modal
 *
 * Responsibilities:
 * - Confirm RSVP deletion
 * - Prevent accidental deletion
 * - Delete RSVP
 * - Loading State
 * - Success/Error Toast
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

import { useState } from "react";

import toast from "react-hot-toast";

import {
  HiOutlineTrash,
  HiOutlineXMark,
} from "react-icons/hi2";

import {
  deleteRSVP,
} from "../../../../../services/rsvpService";

import styles from "./DeleteRSVPModal.module.css";

const DeleteRSVPModal = ({
  open,
  guest,
  onClose,
  onDeleted,
}) => {
  /*
  |--------------------------------------------------------------------------
  | Loading
  |--------------------------------------------------------------------------
  */

  const [loading, setLoading] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | Delete RSVP
  |--------------------------------------------------------------------------
  */

  const handleDelete =
    async () => {
      if (!guest) return;

      try {
        setLoading(true);

        await deleteRSVP(
          guest.id
        );

        toast.success(
          "RSVP deleted successfully."
        );

        if (onDeleted) {
          await onDeleted();
        }

        onClose();
      } catch (error) {
        toast.error(
          error.response?.data
            ?.message ||
            "Unable to delete RSVP."
        );
      } finally {
        setLoading(false);
      }
    };

  /*
  |--------------------------------------------------------------------------
  | Close Modal
  |--------------------------------------------------------------------------
  */

  if (!open || !guest) {
    return null;
  }

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <>
      {/* ======================================
          Overlay
      ====================================== */}

      <div
        className={styles.overlay}
        onClick={onClose}
      />

      {/* ======================================
          Modal
      ====================================== */}

      <div className={styles.modal}>
        {/* ======================================
            Header
        ====================================== */}

        <div className={styles.header}>
          <div>
            <h2>
              Delete RSVP
            </h2>

            <p>
              Please confirm before
              deleting this RSVP
              record.
            </p>
          </div>

          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close"
          >
            <HiOutlineXMark />
          </button>
        </div>

        {/* ======================================
            Warning Icon
        ====================================== */}

        <div
          className={
            styles.iconWrapper
          }
        >
          <HiOutlineTrash
            className={styles.icon}
          />
        </div>

        {/* ======================================
            Guest Details
        ====================================== */}

        <div className={styles.content}>
          <h3>
            {guest.fullName}
          </h3>

          <p>{guest.email}</p>

          <div
            className={
              styles.warning
            }
          >
            <strong>
              Warning:
            </strong>

            <p>
              This action will
              permanently delete
              this RSVP record.

              <br />

              This action cannot be
              undone.
            </p>
          </div>
        </div>

        {/* ======================================
            Footer
        ====================================== */}

        <div className={styles.footer}>
          <button
            type="button"
            className={
              styles.cancelButton
            }
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="button"
            className={
              styles.deleteButton
            }
            onClick={handleDelete}
            disabled={loading}
          >
            {loading
              ? "Deleting..."
              : "Delete RSVP"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteRSVPModal;