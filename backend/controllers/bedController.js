const pool = require("../config/db");

exports.getAllBeds = async (req, res) => {
  const result = await pool.query(`
    SELECT b.*, r.name as room_name, f.name as flat_name 
    FROM beds b 
    JOIN rooms r ON b.room_id = r.id 
    JOIN flats f ON r.flat_id = f.id ORDER BY b.id DESC
  `);
  res.json(result.rows);
};

exports.createBed = async (req, res) => {
  const { room_id, name, status = "Available" } = req.body;

  // Enforce room capacity
  const capRes = await pool.query(
    `
    SELECT capacity, (SELECT COUNT(*) FROM beds WHERE room_id = $1) as current_beds 
    FROM rooms WHERE id = $1
  `,
    [room_id],
  );

  if (capRes.rows.length === 0) {
    return res.status(404).json({ error: "Room not found" });
  }
  if (parseInt(capRes.rows[0].current_beds) >= capRes.rows[0].capacity) {
    return res
      .status(400)
      .json({
        error: `Room capacity reached (${capRes.rows[0].capacity} beds max).`,
      });
  }

  const result = await pool.query(
    "INSERT INTO beds (room_id, name, status) VALUES ($1, $2, $3) RETURNING *",
    [room_id, name, status],
  );
  res.status(201).json(result.rows[0]);
};

exports.updateBedStatus = async (req, res) => {
  const result = await pool.query(
    "UPDATE beds SET status = $1 WHERE id = $2 RETURNING *",
    [req.body.status, req.params.id],
  );
  res.json(result.rows[0]);
};
