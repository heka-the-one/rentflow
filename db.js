const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5433,
  database: "rentflow",
  user: "postgres",
  password: "admin123",
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL database"))
  .catch((err) => console.error("❌ Database connection error:", err));

module.exports = pool;