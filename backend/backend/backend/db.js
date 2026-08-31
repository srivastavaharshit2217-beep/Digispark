```javascript
// DigiSpark Database Connection
// MySQL

const mysql = require("mysql2/promise");


// ===============================
// DATABASE CONFIGURATION
// ===============================

const pool = mysql.createPool({

  host: process.env.DB_HOST || "localhost",

  user: process.env.DB_USER || "root",

  password: process.env.DB_PASSWORD || "",

  database: process.env.DB_NAME || "digispark",

  waitForConnections: true,

  connectionLimit: 10,

  queueLimit: 0

});


// ===============================
// TEST DATABASE CONNECTION
// ===============================

async function testDatabase() {

  try {

    const connection = await pool.getConnection();

    console.log("✅ DigiSpark database connected successfully.");

    connection.release();

  } catch (error) {

    console.error(
      "❌ Database connection failed:",
      error.message
    );

  }

}


testDatabase();


// Export database pool

module.exports = pool;
```
