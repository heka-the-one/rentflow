const pool = require("../db");

const getRooms = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM rooms ORDER BY house_id, number"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const addRoom = async (req, res) => {
  const { house_id, number } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO rooms (house_id, number) VALUES ($1, $2) RETURNING *",
      [house_id, number]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteRoom = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM rooms WHERE id = $1", [id]);
    res.json({ message: "Room deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getRooms, addRoom, deleteRoom };