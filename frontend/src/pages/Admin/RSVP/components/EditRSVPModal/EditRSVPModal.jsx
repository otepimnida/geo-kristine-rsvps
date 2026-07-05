/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * EditRSVPModal.jsx
 *
 * Description:
 * Administrator Edit RSVP Modal
 *
 * Responsibilities:
 * - Edit Guest Information
 * - Update RSVP
 * - Validation
 * - Loading State
 * - Success Toast
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 1.0.0
 * ==========================================================
 */

import {
  useEffect,
  useState,
} from "react";

import toast from "react-hot-toast";

import {
  HiOutlineXMark,
} from "react-icons/hi2";

import {
  updateRSVP,
} from "../../../../../services/rsvpService";

import styles from "./EditRSVPModal.module.css";

const INITIAL_FORM = {
  fullName: "",
  email: "",
  attendance: true,
  totalGuests: 1,
  message: "",
};

const EditRSVPModal = ({
  open,
  guest,
  onClose,
  onUpdated,
}) => {
  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [formData, setFormData] =
    useState(INITIAL_FORM);

  const [errors, setErrors] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | Populate Form
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!guest) return;

    setFormData({
      fullName:
        guest.fullName || "",

      email:
        guest.email || "",

      attendance:
        guest.attendance,

      totalGuests:
        guest.totalGuests || 1,

      message:
        guest.message || "",
    });

    setErrors({});
  }, [guest]);

  /*
  |--------------------------------------------------------------------------
  | Handle Change
  |--------------------------------------------------------------------------
  */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previous) => ({
      ...previous,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));

    setErrors((previous) => ({
      ...previous,

      [name]: "",
    }));
  };

  /*
  |--------------------------------------------------------------------------
  | Validation
  |--------------------------------------------------------------------------
  */

  const validate = () => {
    const validationErrors = {};

    if (
      !formData.fullName.trim()
    ) {
      validationErrors.fullName =
        "Full name is required.";
    }

    if (
      !formData.email.trim()
    ) {
      validationErrors.email =
        "Email is required.";
    }

    if (
      Number(
        formData.totalGuests
      ) < 1
    ) {
      validationErrors.totalGuests =
        "Guest count must be at least 1.";
    }

    setErrors(validationErrors);

    return (
      Object.keys(
        validationErrors
      ).length === 0
    );
  };

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const handleSubmit =
    async (event) => {
      event.preventDefault();

      if (!validate()) {
        return;
      }

      try {
        setLoading(true);

        const payload = {
          full_name:
            formData.fullName,

          email:
            formData.email,

          attendance:
            formData.attendance,

          guest_count:
            Number(
              formData.totalGuests
            ),

          message:
            formData.message,
                    };

        await updateRSVP(
          guest.id,
          payload
        );

        toast.success(
          "RSVP updated successfully."
        );

        if (onUpdated) {
          await onUpdated();
        }

        onClose();

      } catch (error) {

        toast.error(

          error.response?.data?.message ||

          "Unable to update RSVP."

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
      <div
        className={styles.overlay}
        onClick={onClose}
      />

      <div className={styles.modal}>

        {/* =======================================
            Header
        ======================================= */}

        <div className={styles.header}>

          <div>

            <h2>Edit RSVP</h2>

            <p>
              Update guest RSVP
              information.
            </p>

          </div>

          <button
            type="button"
            className={styles.close}
            onClick={onClose}
          >
            <HiOutlineXMark />
          </button>

        </div>

        {/* =======================================
            Form
        ======================================= */}

        <form
          onSubmit={handleSubmit}
          className={styles.form}
        >

          {/* Full Name */}

          <div className={styles.group}>

            <label>
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />

            {errors.fullName && (
              <small>
                {errors.fullName}
              </small>
            )}

          </div>

          {/* Email */}

          <div className={styles.group}>

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            {errors.email && (
              <small>
                {errors.email}
              </small>
            )}

          </div>

          {/* Attendance */}

          <div className={styles.group}>

            <label>
              Attendance
            </label>

            <select
              name="attendance"
              value={
                formData.attendance
                  ? "true"
                  : "false"
              }
              onChange={(event) =>
                setFormData(
                  (previous) => ({
                    ...previous,
                    attendance:
                      event.target
                        .value ===
                      "true",
                  })
                )
              }
            >

              <option value="true">
                Attending
              </option>

              <option value="false">
                Declined
              </option>

            </select>

          </div>

          {/* Guest Count */}

          <div className={styles.group}>

            <label>
              Guest Count
            </label>

            <input
              type="number"
              min="1"
              name="totalGuests"
              value={
                formData.totalGuests
              }
              onChange={handleChange}
            />

            {errors.totalGuests && (
              <small>
                {errors.totalGuests}
              </small>
            )}

          </div>

                    {/* =======================================
              Personal Message
          ======================================= */}

          <div className={styles.group}>

            <label>
              Personal Message
            </label>

            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Write a message for the couple..."
            />

          </div>

          {/* =======================================
              Footer
          ======================================= */}

          <div className={styles.footer}>

            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={styles.saveButton}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>
    </>
  );
};

export default EditRSVPModal;