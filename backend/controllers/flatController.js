const pool = require("../config/db");

exports.getAllFlats = async (req, res) => {
  const result = await pool.query("SELECT * FROM flats ORDER BY id DESC");
  res.json(result.rows);
};

exports.createFlat = async (req, res) => {
  const { name, address } = req.body;
  if (!name || !address) {
    return res.status(400).json({ error: "Name and address required" });
  }
  const result = await pool.query(
    "INSERT INTO flats (name, address) VALUES ($1, $2) RETURNING *",
    [name, address],
  );
  res.status(201).json(result.rows[0]);
};

exports.deleteFlat = async (req, res) => {
  const flatId = req.params.id;
  const { force } = req.query;

  const activeRes = await pool.query(
    `
    SELECT COUNT(a.id) as active_count FROM assignments a
    JOIN beds b ON a.bed_id = b.id
    JOIN rooms r ON b.room_id = r.id
    WHERE r.flat_id = $1 AND a.active = true;
  `,
    [flatId],
  );

  if (parseInt(activeRes.rows[0].active_count) > 0 && force !== "true") {
    return res.status(400).json({
      error:
        "Cannot delete: Flat contains active tenant assignments. Clear assignments or confirm override.",
      requiresConfirmation: true,
    });
  }

  await pool.query("DELETE FROM flats WHERE id = $1", [flatId]);
  res.json({ message: "Flat deleted successfully" });
};
