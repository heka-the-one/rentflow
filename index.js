const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://project-r7fo0.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());
// Handle errors globally
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});
app.get("/", (req, res) => {
  res.json({ message: "✅ RentFlow Backend is running!" });
});

const authRoutes = require("./routes/auth");
const houseRoutes = require("./routes/houses");
const roomRoutes = require("./routes/rooms");
const tenantRoutes = require("./routes/tenants");

app.use("/api/auth", authRoutes);
app.use("/api/houses", houseRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/tenants", tenantRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});