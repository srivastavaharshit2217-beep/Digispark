const express = require("express");
const db = require("../db");

const router = express.Router();

router.get("/enquiries", async (req, res) => {
  try {
    const adminKey = process.env.ADMIN_KEY;
    if (adminKey && req.get("x-admin-key") !== adminKey) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    const result = await db.query(
      `SELECT id, name, email, phone, service, project_type, budget, message, status, created_at
       FROM enquiries ORDER BY created_at DESC LIMIT 100`
    );

    res.json({ success: true, count: result.rows.length, enquiries: result.rows });
  } catch (error) {
    console.error("Admin enquiries error:", error);
    res.status(500).json({ success: false, message: "Unable to load enquiries." });
  }
});

router.patch("/enquiries/:id", async (req, res) => {
  try {
    const adminKey = process.env.ADMIN_KEY;
    if (adminKey && req.get("x-admin-key") !== adminKey) {
      return res.status(401).json({ success: false, message: "Unauthorized." });
    }

    const allowed = ["new", "contacted", "in_progress", "completed", "cancelled"];
    const { status } = req.body;
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status." });
    }

    const result = await db.query(
      `UPDATE enquiries SET status = $1 WHERE id = $2 RETURNING id, status`,
      [status, req.params.id]
    );

    if (!result.rowCount) {
      return res.status(404).json({ success: false, message: "Enquiry not found." });
    }

    res.json({ success: true, enquiry: result.rows[0] });
  } catch (error) {
    console.error("Admin update error:", error);
    res.status(500).json({ success: false, message: "Unable to update enquiry." });
  }
});

module.exports = router;
