const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        max: 5,
        idleTimeoutMillis: 10000,
        connectionTimeoutMillis: 10000,
        keepAlive: true,
        keepAliveInitialDelayMillis: 10000,
      }
    : {
        host: "localhost",
        port: 5433,
        database: "rentflow",
        user: "postgres",
        password: "admin123",
      }
);

// Handle unexpected errors
pool.on("error", (err) => {
  console.error("Unexpected database error:", err.message);
});

// Test connection
const connectWithRetry = async () => {
  try {
    await pool.connect();
    console.log("✅ Connected to PostgreSQL database");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    console.log("Retrying in 5 seconds...");
    setTimeout(connectWithRetry, 5000);
  }
};

connectWithRetry();

module.exports = pool;