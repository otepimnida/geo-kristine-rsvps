/**
 * ==========================================================
 * Geo & Kristine RSVP System
 * ----------------------------------------------------------
 * File:
 * useCounter.js
 *
 * Description:
 * Smooth animated counter hook.
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

const useCounter = (
  endValue = 0,
  duration = 700
) => {
  const [count, setCount] =
    useState(0);

  useEffect(() => {
    const target = Number(endValue) || 0;

    if (target <= 0) {
      setCount(0);
      return;
    }

    let start = 0;

    const frameRate = 16;

    const increment =
      target /
      (duration / frameRate);

    const timer = setInterval(() => {
      start += increment;

      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(
          Math.floor(start)
        );
      }
    }, frameRate);

    return () =>
      clearInterval(timer);
  }, [endValue, duration]);

  return count;
};

export default useCounter;