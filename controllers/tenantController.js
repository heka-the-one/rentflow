const pool = require("../db");

const getTenants = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tenants ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const addTenant = async (req, res) => {
  const { room_id, name, phone, start_date, end_date, amount_paid, months_paid } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO tenants 
        (room_id, name, phone, start_date, end_date, amount_paid, months_paid)
       VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [room_id, name, phone, start_date, end_date, amount_paid, months_paid]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateTenant = async (req, res) => {
  const { id } = req.params;
  const { name, phone, start_date, end_date, amount_paid, months_paid } = req.body;
  try {
    const result = await pool.query(
      `UPDATE tenants SET
        name=$1, phone=$2, start_date=$3,
        end_date=$4, amount_paid=$5, months_paid=$6
       WHERE id=$7 RETURNING *`,
      [name, phone, start_date, end_date, amount_paid, months_paid, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTenant = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM tenants WHERE id = $1", [id]);
    res.json({ message: "Tenant deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getTenants, addTenant, updateTenant, deleteTenant };