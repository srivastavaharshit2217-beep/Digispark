const express = require("express");
const crypto = require("crypto");
const db = require("../db");

const router = express.Router();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/", async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const phone = String(req.body.phone || "").trim();
    const service = String(req.body.service || "").trim();
    const projectType = String(req.body.project_type || "").trim();
    const budget = String(req.body.budget || "").trim();
    const message = String(req.body.message || "").trim();

    if (!name || !email || !phone || !service || !projectType || !budget || !message) {
      return res.status(400).json({ success: false, message: "Please fill all required fields." });
    }

    if (name.length > 100 || email.length > 150 || phone.length > 30 || service.length > 100 || projectType.length > 100 || budget.length > 100 || message.length > 5000) {
      return res.status(400).json({ success: false, message: "One or more fields are too long." });
    }

    if (!EMAIL_PATTERN.test(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }

    if (!/^[+0-9()\-\s]{7,30}$/.test(phone)) {
      return res.status(400).json({ success: false, message: "Please enter a valid phone number." });
    }

    const trackingToken = crypto.randomBytes(24).toString("hex");
    const result = await db.query(
      `INSERT INTO enquiries (name, email, phone, service, project_type, budget, message, tracking_token)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, tracking_token`,
      [name, email, phone, service, projectType, budget, message, trackingToken]
    );

    res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
      enquiryId: result.rows[0].id,
      trackingToken: result.rows[0].tracking_token
    });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({ success: false, message: "Unable to save your enquiry." });
  }
});

// Public client status lookup. The random token is required; no admin key or email is exposed.
router.get("/status/:token", async (req, res) => {
  try {
    const token = String(req.params.token || "").trim();
    if (!/^[a-f0-9]{48}$/.test(token)) {
      return res.status(400).json({ success: false, message: "Invalid tracking link." });
    }

    const result = await db.query(
      `SELECT id, name, service, project_type, status, created_at
       FROM enquiries WHERE tracking_token = $1 LIMIT 1`,
      [token]
    );

    if (!result.rowCount) {
      return res.status(404).json({ success: false, message: "Enquiry not found." });
    }

    res.json({ success: true, enquiry: result.rows[0] });
  } catch (error) {
    console.error("Status lookup error:", error);
    res.status(500).json({ success: false, message: "Unable to load enquiry status." });
  }
});

module.exports = router;
