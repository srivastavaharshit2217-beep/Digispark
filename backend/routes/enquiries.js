const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, service, message } = req.body;

    if (!name || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
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
