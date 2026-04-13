const pool = require("../config/db");

exports.createAssignment = async (req, res) => {
  const { tenant_id, bed_id } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // Verify bed availability
    const bedRes = await client.query(
      "SELECT status FROM beds WHERE id = $1 FOR UPDATE",
      [bed_id],
    );
    if (bedRes.rows.length === 0) throw new Error("Bed not found");
    const bedStatus = bedRes.rows[0].status;

    if (bedStatus === "Under Maintenance")
      throw new Error("Cannot assign a bed that is Under Maintenance");
    if (bedStatus === "Occupied") throw new Error("Bed is already Occupied");

    // Free up old bed if tenant is moving
    const prevAssignment = await client.query(
      "SELECT id, bed_id FROM assignments WHERE tenant_id = $1 AND active = true",
      [tenant_id],
    );
    if (prevAssignment.rows.length > 0) {
      await client.query(
        "UPDATE assignments SET active = false WHERE id = $1",
        [prevAssignment.rows[0].id],
      );
      await client.query("UPDATE beds SET status = 'Available' WHERE id = $1", [
        prevAssignment.rows[0].bed_id,
      ]);
    }

    // Assign new bed
    await client.query(
      "INSERT INTO assignments (tenant_id, bed_id, active) VALUES ($1, $2, true)",
      [tenant_id, bed_id],
    );
    await client.query("UPDATE beds SET status = 'Occupied' WHERE id = $1", [
      bed_id,
    ]);

    await client.query("COMMIT");
    res.json({ message: "Tenant assigned successfully" });
  } catch (error) {
    await client.query("ROLLBACK");
    res.status(400).json({ error: error.message });
  } finally {
    client.release();
  }
};
