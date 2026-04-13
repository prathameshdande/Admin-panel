const pool = require("../config/db");

exports.getAllTenants = async (req, res) => {
  const result = await pool.query(`
    SELECT t.*, b.name as bed_name, r.name as room_name, f.name as flat_name, b.id as bed_id
    FROM tenants t
    LEFT JOIN assignments a ON t.id = a.tenant_id AND a.active = true
    LEFT JOIN beds b ON a.bed_id = b.id
    LEFT JOIN rooms r ON b.room_id = r.id
    LEFT JOIN flats f ON r.flat_id = f.id
    ORDER BY t.id DESC
  `);
  res.json(result.rows);
};

exports.createTenant = async (req, res) => {
  const { name, phone } = req.body;
  const result = await pool.query(
    "INSERT INTO tenants (name, phone) VALUES ($1, $2) RETURNING *",
    [name, phone],
  );
  res.status(201).json(result.rows[0]);
};

exports.deleteTenant = async (req, res) => {
  const activeRes = await pool.query(
    "SELECT id FROM assignments WHERE tenant_id = $1 AND active = true",
    [req.params.id],
  );
  if (activeRes.rows.length > 0) {
    return res
      .status(400)
      .json({ error: "Cannot delete tenant with an active bed assignment." });
  }
  await pool.query("DELETE FROM tenants WHERE id = $1", [req.params.id]);
  res.json({ message: "Tenant deleted" });
};
