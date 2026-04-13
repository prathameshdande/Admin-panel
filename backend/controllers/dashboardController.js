const pool = require("../config/db");

exports.getDashboard = async (req, res) => {
  const result = await pool.query(`
    SELECT 
      f.name AS flat_name, r.name AS room_name, r.capacity AS capacity,
      COUNT(b.id) AS total_beds,
      COUNT(CASE WHEN b.status = 'Occupied' THEN 1 END) AS occupied_beds,
      CASE WHEN COUNT(b.id) > 0 THEN ROUND((COUNT(CASE WHEN b.status = 'Occupied' THEN 1 END) * 100.0) / COUNT(b.id), 1) ELSE 0 END as occupancy_rate
    FROM flats f
    LEFT JOIN rooms r ON f.id = r.flat_id
    LEFT JOIN beds b ON r.id = b.room_id
    GROUP BY f.id, r.id ORDER BY f.name, r.name;
  `);
  res.json(result.rows);
};
