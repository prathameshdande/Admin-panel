const pool = require("../config/db");

exports.getAllRooms = async (req, res) => {
  const result = await pool.query(`
    SELECT r.*, f.name as flat_name 
    FROM rooms r JOIN flats f ON r.flat_id = f.id ORDER BY r.id DESC
  `);
  res.json(result.rows);
};

exports.createRoom = async (req, res) => {
  const { flat_id, name, capacity } = req.body;
  if (!flat_id || !name || capacity <= 0) {
    return res.status(400).json({ error: "Invalid room details" });
  }
  const result = await pool.query(
    "INSERT INTO rooms (flat_id, name, capacity) VALUES ($1, $2, $3) RETURNING *",
    [flat_id, name, capacity],
  );
  res.status(201).json(result.rows[0]);
};
