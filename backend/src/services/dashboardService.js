/**
 * --------------------------------------------------------
 * Dashboard Service
 * --------------------------------------------------------
 * Aggregates dashboard data into a single response.
 * --------------------------------------------------------
 */

const { StatusCodes } = require("http-status-codes");

const supabase = require("../config/supabase");
const AppError = require("../utils/AppError");

const {
  getRecentActivities,
} = require("./activityLogService");

/*
|--------------------------------------------------------------------------
| Statistics
|--------------------------------------------------------------------------
*/

const getStatistics = async () => {
  const { data, error } = await supabase
    .from("rsvps")
    .select(`
      attendance,
      guest_count
    `);

  if (error) {
    throw new AppError(
      error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  const totalRSVPs = data.length;

  const attending = data.filter(
    (rsvp) => rsvp.attendance === true
  ).length;

  const declined = data.filter(
    (rsvp) => rsvp.attendance === false
  ).length;

  const totalGuests = data.reduce(
    (sum, rsvp) =>
      sum + Number(rsvp.guest_count || 0),
    0
  );

  return {
    totalRSVPs,
    attending,
    declined,
    totalGuests,
  };
};

/*
|--------------------------------------------------------------------------
| Attendance Chart
|--------------------------------------------------------------------------
*/

const getAttendanceChart = async () => {
  const stats =
    await getStatistics();

  return [
    {
      name: "Attending",
      value: stats.attending,
    },
    {
      name: "Declined",
      value: stats.declined,
    },
  ];
};

/*
|--------------------------------------------------------------------------
| Monthly RSVP Chart
|--------------------------------------------------------------------------
*/

const getMonthlyChart = async () => {
  const { data, error } = await supabase
    .from("rsvps")
    .select("created_at");

  if (error) {
    throw new AppError(
      error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  const months = {};

  data.forEach((item) => {
    const month =
      new Date(
        item.created_at
      ).toLocaleString("default", {
        month: "short",
      });

    months[month] =
      (months[month] || 0) + 1;
  });

  return Object.entries(months).map(
    ([month, total]) => ({
      month,
      total,
    })
  );
};

/*
|--------------------------------------------------------------------------
| Recent RSVPs
|--------------------------------------------------------------------------
*/

const getRecentRSVPs = async (
  limit = 5
) => {
  const { data, error } = await supabase
    .from("rsvps")
    .select(`
      id,
      full_name,
      email,
      attendance,
      guest_count,
      created_at
    `)
    .order("created_at", {
      ascending: false,
    })
    .limit(limit);

  if (error) {
    throw new AppError(
      error.message,
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  return data;
};

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

const getDashboard =
  async () => {
    const [
      statistics,
      attendanceChart,
      monthlyChart,
      recentRSVPs,
      recentActivities,
    ] = await Promise.all([
      getStatistics(),
      getAttendanceChart(),
      getMonthlyChart(),
      getRecentRSVPs(),
      getRecentActivities(5),
    ]);

    return {
      statistics,
      attendanceChart,
      monthlyChart,
      recentRSVPs,
      recentActivities,
    };
  };

module.exports = {
  getDashboard,
};