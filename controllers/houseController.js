const pool = require("../db");

const getHouses = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM houses ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("GET HOUSES ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};

const addHouse = async (req, res) => {
  const { name, address } = req.body;
  try {
    console.log("Adding house:", name, address);
    const result = await pool.query(
      "INSERT INTO houses (name, address) VALUES ($1, $2) RETURNING *",
      [name, address]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("ADD HOUSE ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};

const deleteHouse = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM houses WHERE id = $1", [id]);
    res.json({ message: "House deleted" });
  } catch (err) {
    console.error("DELETE HOUSE ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getHouses, addHouse, deleteHouse };