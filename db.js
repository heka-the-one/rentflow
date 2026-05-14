const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        host: "localhost",
        port: 5433,
        database: "rentflow",
        user: "postgres",
        password: "admin123",
      }
);

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL database"))
  .catch((err) => console.error("❌ Database connection error:", err));

module.exports = pool;