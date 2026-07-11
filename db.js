const { Pool } = require("pg");
require("dotenv").config();

let pool;

const createPool = () => {
  pool = new Pool(
    process.env.DATABASE_URL
      ? {
          connectionString: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false },
          max: 3,
          idleTimeoutMillis: 10000,
          connectionTimeoutMillis: 10000,
          keepAlive: true,
        }
      : {
          host: "localhost",
          port: 5433,
          database: "rentflow",
          user: "postgres",
          password: "admin123",
        }
  );

  pool.on("error", (err) => {
    console.error("Database pool error:", err.message);
    setTimeout(createPool, 5000);
  });

  pool.connect()
    .then(client => {
      console.log("✅ Connected to PostgreSQL database");
      client.release();
    })
    .catch(err => {
      console.error("❌ Connection error:", err.message);
      setTimeout(createPool, 5000);
    });
};

createPool();

module.exports = {
  query: (...args) => pool.query(...args),
};