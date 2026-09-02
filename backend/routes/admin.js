const express = require("express");
const crypto = require("crypto");
const db = require("../db");

const router = express.Router();
const SESSION_COOKIE = "ds_admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

function timingSafeEqual(a, b) {
  const aa = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return aa.length === bb.length && crypto.timingSafeEqual(aa, bb);
}

function sessionToken(timestamp) {
  const secret = process.env.ADMIN_KEY;
  if (!secret) return "";
  return crypto.createHmac("sha256", secret).update(String(timestamp)).digest("hex");
}

function parseCookies(req) {
  const header = req.headers.cookie || "";
  return Object.fromEntries(header.split(";").filter(Boolean).map(part => {
    const i = part.indexOf("=");
    return i === -1 ? [part.trim(), ""] : [part.slice(0, i).trim(), decodeURIComponent(part.slice(i + 1).trim())];
  }));
}

function checkAdmin(req, res) {
  const secret = process.env.ADMIN_KEY;
  const raw = parseCookies(req)[SESSION_COOKIE] || "";
  const [timestamp, token] = raw.split(".");
  const time = Number(timestamp);
  const valid = secret && Number.isFinite(time) && Date.now() - time >= 0 && Date.now() - time < SESSION_TTL_MS && timingSafeEqual(token || "", sessionToken(time));
  if (!valid) {
    res.status(401).json({ success: false, message: "Unauthorized." });
    return false;
  }
  return true;
}

router.post("/login", (req, res) => {
  const loginId = process.env.ADMIN_LOGIN_ID;
  const password = process.env.ADMIN_LOGIN_PASSWORD;
  if (!loginId || !password || !process.env.ADMIN_KEY) {
    return res.status(503).json({ success: false, message: "Admin login is not configured on the server." });
  }
  const { id, password: suppliedPassword } = req.body || {};
  if (!timingSafeEqual(id || "", loginId) || !timingSafeEqual(suppliedPassword || "", password)) {
    return res.status(401).json({ success: false, message: "Invalid admin ID or password." });
  }
  const timestamp = Date.now();
  const token = `${timestamp}.${sessionToken(timestamp)}`;
  res.setHeader("Set-Cookie", `${SESSION_COOKIE}=${encodeURIComponent(token)}; Max-Age=${SESSION_TTL_MS / 1000}; Path=/api/admin; HttpOnly; Secure; SameSite=None`);
  res.json({ success: true, message: "Admin login successful." });
});

router.post("/logout", (req, res) => {
  res.setHeader("Set-Cookie", `${SESSION_COOKIE}=; Max-Age=0; Path=/api/admin; HttpOnly; Secure; SameSite=None`);
  res.json({ success: true });
});

router.get("/session", (req, res) => {
  if (!checkAdmin(req, res)) return;
  res.json({ success: true, authenticated: true });
});

router.get("/enquiries", async (req, res) => {
  try {
    if (!checkAdmin(req, res)) return;
    const result = await db.query(
      `SELECT id, name, email, phone, service, project_type, budget, message, status, tracking_token, created_at
       FROM enquiries ORDER BY created_at DESC LIMIT 100`
    );
    res.json({ success: true, count: result.rows.length, enquiries: result.rows });
  } catch (error) {
    console.error("Admin enquiries error:", error);
    res.status(500).json({ success: false, message: "Unable to load enquiries." });
  }
});

router.get("/analytics", async (req, res) => {
  try {
    if (!checkAdmin(req, res)) return;
    const [summary, statuses, services, monthly] = await Promise.all([
      db.query(`SELECT COUNT(*)::int AS total, COUNT(*) FILTER (WHERE status='new')::int AS new_leads, COUNT(*) FILTER (WHERE status IN ('contacted','in_progress'))::int AS active_leads, COUNT(*) FILTER (WHERE status='completed')::int AS completed_leads, COUNT(*) FILTER (WHERE status='cancelled')::int AS cancelled_leads FROM enquiries`),
      db.query(`SELECT status, COUNT(*)::int AS count FROM enquiries GROUP BY status ORDER BY count DESC`),
      db.query(`SELECT COALESCE(NULLIF(TRIM(service),''),'Unknown') AS service, COUNT(*)::int AS count FROM enquiries GROUP BY 1 ORDER BY count DESC`),
      db.query(`SELECT TO_CHAR(DATE_TRUNC('month', created_at), 'Mon YYYY') AS month, DATE_TRUNC('month', created_at) AS month_date, COUNT(*)::int AS count FROM enquiries WHERE created_at >= DATE_TRUNC('month', CURRENT_DATE) - INTERVAL '5 months' GROUP BY 1,2 ORDER BY month_date`)
    ]);
    const s = summary.rows[0] || { total: 0, new_leads: 0, active_leads: 0, completed_leads: 0, cancelled_leads: 0 };
    const total = Number(s.total) || 0;
    const completed = Number(s.completed_leads) || 0;
    res.json({ success: true, summary: { ...s, conversion_rate: total ? Number(((completed / total) * 100).toFixed(1)) : 0 }, statuses: statuses.rows, services: services.rows, monthly: monthly.rows.map(({ month, count }) => ({ month, count })) });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ success: false, message: "Unable to load analytics." });
  }
});

router.patch("/enquiries/:id", async (req, res) => {
  try {
    if (!checkAdmin(req, res)) return;
    const allowed = ["new", "contacted", "in_progress", "completed", "cancelled"];
    const { status } = req.body;
    if (!allowed.includes(status)) return res.status(400).json({ success: false, message: "Invalid status." });
    const result = await db.query(`UPDATE enquiries SET status = $1 WHERE id = $2 RETURNING id, status`, [status, req.params.id]);
    if (!result.rowCount) return res.status(404).json({ success: false, message: "Enquiry not found." });
    res.json({ success: true, enquiry: result.rows[0] });
  } catch (error) {
    console.error("Admin update error:", error);
    res.status(500).json({ success: false, message: "Unable to update enquiry." });
  }
});

module.exports = router;
