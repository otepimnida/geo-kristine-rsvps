/**
 * --------------------------------------------------------
 * Geo & Kristine RSVP System
 * --------------------------------------------------------
 * Express Application
 * --------------------------------------------------------
 * Configures middleware, routes,
 * and global error handling.
 * --------------------------------------------------------
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

const authRoutes = require("./routes/authRoutes");
const rsvpRoutes = require("./routes/rsvpRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

/*
|--------------------------------------------------------------------------
| Express
|--------------------------------------------------------------------------
*/

const app = express();

/*
|--------------------------------------------------------------------------
| Security
|--------------------------------------------------------------------------
*/

app.use(

  helmet({

    crossOriginResourcePolicy: false,

  })

);

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

const allowedOrigins =

  process.env.CLIENT_URL

    ? process.env.CLIENT_URL

        .split(",")

        .map((origin) => origin.trim())

    : [

        "http://localhost:5173",

      ];

app.use(

  cors({

    origin: allowedOrigins,

    credentials: true,

  })

);

/*
|--------------------------------------------------------------------------
| Body Parser
|--------------------------------------------------------------------------
*/

app.use(

  express.json({

    limit: "10mb",

  })

);

app.use(

  express.urlencoded({

    extended: true,

    limit: "10mb",

  })

);

/*
|--------------------------------------------------------------------------
| Utilities
|--------------------------------------------------------------------------
*/

app.use(cookieParser());

app.use(compression());

app.use(morgan("dev"));

/*
|--------------------------------------------------------------------------
| Root Endpoint
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message:
      "Geo & Kristine RSVP Backend API is running.",

    environment:
      process.env.NODE_ENV,

    timestamp:
      new Date().toISOString(),

  });

});

/*
|--------------------------------------------------------------------------
| API Prefix
|--------------------------------------------------------------------------
*/

const API_PREFIX = "/api";

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use(

  `${API_PREFIX}/auth`,

  authRoutes

);

app.use(

  `${API_PREFIX}/rsvp`,

  rsvpRoutes

);

app.use(

  `${API_PREFIX}/dashboard`,

  dashboardRoutes

);

app.use(

  `${API_PREFIX}/settings`,

  settingsRoutes

);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use(notFound);

/*
|--------------------------------------------------------------------------
| Global Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorHandler);

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

module.exports = app;