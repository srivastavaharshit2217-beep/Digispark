```javascript
const express = require("express");
const db = require("../db");

const router = express.Router();

router.post("/", async (req, res) => {

  try {

    const {
      name,
      email,
      service,
      message
    } = req.body;

    if (!name || !email || !service || !message) {

      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
      });

    }

    const [result] = await db.execute(
      `INSERT INTO enquiries
      (name, email, service, message)
      VALUES (?, ?, ?, ?)`,
      [name, email, service, message]
    );

    res.status(201).json({

      success: true,

      message: "Your enquiry has been submitted successfully.",

      enquiryId: result.insertId

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: "Something went wrong."

    });

  }

});

module.exports = router;
```

