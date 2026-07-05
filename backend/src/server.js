require("dotenv").config();

const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("========================================");
  console.log(" Geo & Kristine RSVP Backend");
  console.log("========================================");
  console.log(` Environment : ${process.env.NODE_ENV}`);
  console.log(` Server      : http://localhost:${PORT}`);
  console.log(` Started At  : ${new Date().toLocaleString()}`);
  console.log("========================================");
});

server.on("error", (error) => {
  console.error("Server Error:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);

  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);

  process.exit(1);
});

process.on("SIGINT", () => {
  console.log("\nGracefully shutting down server...");

  server.close(() => {
    console.log("Server stopped.");
    process.exit(0);
  });
});