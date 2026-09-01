const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const enquiryRoutes = require("./routes/enquiries");

async function initializeDatabase() {
  await db.query(`
    CREATE TABLE IF NOT EXISTS enquiries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL,
      service VARCHAR(100) NOT NULL,
      message TEXT NOT NULL,
      status VARCHAR(30) DEFAULT 'new',
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("PostgreSQL database initialized successfully.");
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to DigiSpark API",
    tagline: "Spark Your Digital Future",
    status: "Backend is running"
  });
});

app.get("/api/services", (req, res) => {
  res.json({
    success: true,
    services: [
      { id: 1, name: "Web Development", description: "Modern and responsive websites." },
      { id: 2, name: "Digital Marketing", description: "Grow your business with digital marketing." },
      { id: 3, name: "SEO", description: "Improve your search engine visibility." },
      { id: 4, name: "Graphic Design", description: "Professional graphics and branding." },
      { id: 5, name: "Video Editing", description: "Professional reels and video editing." },
      { id: 6, name: "Business Solutions", description: "Digital solutions for modern businesses." }
    ]
  });
});

app.use("/api/enquiries", enquiryRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found."
  });
});

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`DigiSpark server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database initialization failed:", error);
    process.exit(1);
  });
