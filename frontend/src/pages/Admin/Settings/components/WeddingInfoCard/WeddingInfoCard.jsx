/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * WeddingInfoCard.jsx
 *
 * Description:
 * Wedding Information Card
 *
 * Responsibilities:
 * - Display Wedding Information
 * - Edit Wedding Details
 * - Save Wedding Information
 *
 * Author:
 * OpenAI + Otep
 *
 * Version:
 * 2.0.0
 * ==========================================================
 */

import {
  useState,
  useEffect,
} from "react";

import {
  HiOutlineHeart,
  HiOutlineCalendarDays,
  HiOutlineMapPin,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";

import styles from "./WeddingInfoCard.module.css";

const WeddingInfoCard = ({
  wedding,
  loading = false,
  onSave,
}) => {

  /*
  |--------------------------------------------------------------------------
  | Form State
  |--------------------------------------------------------------------------
  */

  const [
    groomName,
    setGroomName,
  ] = useState("");

  const [
    brideName,
    setBrideName,
  ] = useState("");

  const [
    weddingDate,
    setWeddingDate,
  ] = useState("");

  const [
    venue,
    setVenue,
  ] = useState("");

  const [
    address,
    setAddress,
  ] = useState("");

  /*
  |--------------------------------------------------------------------------
  | Sync Wedding Information
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    if (!wedding) return;

    setGroomName(
      wedding.groom_name || ""
    );

    setBrideName(
      wedding.bride_name || ""
    );

    setWeddingDate(
      wedding.wedding_date || ""
    );

    setVenue(
      wedding.venue || ""
    );

    setAddress(
      wedding.address || ""
    );

  }, [wedding]);

  /*
  |--------------------------------------------------------------------------
  | Save
  |--------------------------------------------------------------------------
  */

  const handleSubmit =
    async (event) => {

      event.preventDefault();

      if (!onSave) return;

      await onSave({

        groom_name:
          groomName.trim(),

        bride_name:
          brideName.trim(),

        wedding_date:
          weddingDate,

        venue:
          venue.trim(),

        address:
          address.trim(),

      });

    };

  return (

    <section className={styles.card}>

      {/* ======================================
          Header
      ====================================== */}

      <div className={styles.header}>

        <h2>

          Wedding Information

        </h2>

        <p>

          Update the wedding details
          shown throughout the RSVP
          system.

        </p>

      </div>

      {/* ======================================
          Form
      ====================================== */}

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >

        {/* Groom Name */}

        <div className={styles.group}>

          <label>

            Groom Name

          </label>

          <div className={styles.inputWrapper}>

            <HiOutlineHeart
              className={styles.icon}
            />

            <input
              type="text"
              value={groomName}
              onChange={(e) =>
                setGroomName(
                  e.target.value
                )
              }
              placeholder="Enter groom's name"
            />

          </div>

        </div>

        {/* Bride Name */}

        <div className={styles.group}>

          <label>

            Bride Name

          </label>

          <div className={styles.inputWrapper}>

            <HiOutlineHeart
              className={styles.icon}
            />

            <input
              type="text"
              value={brideName}
              onChange={(e) =>
                setBrideName(
                  e.target.value
                )
              }
              placeholder="Enter bride's name"
            />

          </div>

        </div>

        {/* Wedding Date */}

        <div className={styles.group}>

          <label>

            Wedding Date

          </label>

          <div className={styles.inputWrapper}>

            <HiOutlineCalendarDays
              className={styles.icon}
            />

            <input
              type="date"
              value={weddingDate}
              onChange={(e) =>
                setWeddingDate(
                  e.target.value
                )
              }
            />

          </div>

        </div>

        {/* Venue */}

        <div className={styles.group}>

          <label>

            Venue

          </label>

          <div className={styles.inputWrapper}>

            <HiOutlineBuildingOffice2
              className={styles.icon}
            />

            <input
              type="text"
              value={venue}
              onChange={(e) =>
                setVenue(
                  e.target.value
                )
              }
              placeholder="Wedding venue"
            />

          </div>

        </div>

        {/* Address */}

        <div className={styles.group}>

          <label>

            Address

          </label>

          <div className={styles.inputWrapper}>

            <HiOutlineMapPin
              className={styles.icon}
            />

            <textarea
              rows={4}
              value={address}
              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }
              placeholder="Wedding address"
            />          </div>

        </div>

        {/* ======================================
            Footer
        ====================================== */}

        <div className={styles.footer}>

          <button
            type="submit"
            className={styles.saveButton}
            disabled={loading}
          >

            {loading
              ? "Saving..."
              : "Save Wedding Information"}

          </button>

        </div>

      </form>

    </section>

  );

};

export default WeddingInfoCard;