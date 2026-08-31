```javascript
const express = require("express");

const cors = require("cors");


const app = express();


const PORT =
  process.env.PORT || 5000;


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true
  })
);


// ==========================================
// ROUTES
// ==========================================

const enquiryRoutes =
  require("./routes/enquiries");


// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {

  res.json({

    success: true,

    message:
      "Welcome to DigiSpark API",

    tagline:
      "Spark Your Digital Future",

    status:
      "Backend is running"

  });

});


// ==========================================
// SERVICES
// ==========================================

app.get(
  "/api/services",
  (req, res) => {

    const services = [

      {
        id: 1,
        name: "Web Development",
        description:
          "Modern and responsive websites."
      },

      {
        id: 2,
        name: "Digital Marketing",
        description:
          "Grow your business with digital marketing."
      },

      {
        id: 3,
        name: "SEO",
        description:
          "Improve your search engine visibility."
      },

      {
        id: 4,
        name: "Graphic Design",
        description:
          "Professional graphics and branding."
      },

      {
        id: 5,
        name: "Video Editing",
        description:
          "Professional reels and video editing."
      },

      {
        id: 6,
        name: "Business Solutions",
        description:
          "Digital solutions for modern businesses."
      }

    ];


    res.json({

      success: true,

      services: services

    });

  }
);


// ==========================================
// ENQUIRIES
// ==========================================

app.use(
  "/api/enquiries",
  enquiryRoutes
);


// ==========================================
// 404
// ==========================================

app.use(
  (req, res) => {

    res.status(404).json({

      success: false,

      message:
        "API route not found."

    });

  }
);


// ==========================================
// SERVER
// ==========================================

app.listen(
  PORT,
  () => {

    console.log(
      `🚀 DigiSpark server running on port ${PORT}`
    );

  }
);
```
