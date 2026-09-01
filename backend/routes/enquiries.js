const express = require("express");
const db = require("../db");

const router = express.Router();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post("/", async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const email = String(req.body.email || "").trim().toLowerCase();
    const service = String(req.body.service || "").trim();
    const message = String(req.body.message || "").trim();

    if (!name || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
      });
    }

    if (name.length > 100 || email.length > 150 || service.length > 100 || message.length > 5000) {
      return res.status(400).json({
        success: false,
        message: "One or more fields are too long."
      });
    }

    if (!EMAIL_PATTERN.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address."
      });
    }

    const result = await db.query(
      `INSERT INTO enquiries (name, email, service, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [name, email, service, message]
    );

    res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
      enquiryId: result.rows[0].id
    });
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to save your enquiry."
    });
  }
});

module.exports = router;
