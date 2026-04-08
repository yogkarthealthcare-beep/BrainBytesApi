import express from "express";
import sql from "./db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
/* ==========================
   SIMPLE API KEY AUTH
========================== */
const apiAuth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};
/* ==========================
   GET ALL USERS API
========================== */
app.get("/api/users", async (req, res) => {
  try {
    const users = await sql`SELECT * FROM users`;
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ======================
   ALL USERS API (NO AUTH)
====================== */
app.get("/api/usersNew", async (req, res) => {
  try {
    const users = await sql`
      SELECT id, full_name, email FROM users
    `;

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ==========================
   GET DAYS API (NO JWT)
========================== */
app.get("/api/days", async (req, res) => {
  try {
    const days = [
      { id: 1, name: "Monday" },
      { id: 2, name: "Tuesday" },
      { id: 3, name: "Wednesday" },
      { id: 4, name: "Thursday" },
      { id: 5, name: "Friday" },
      { id: 6, name: "Saturday" },
      { id: 7, name: "Sunday" }
    ];

    res.json(days);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/* ==========================
   GET USER BY ID
========================== */
app.get("/api/users/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await sql`
      SELECT * FROM users WHERE id = ${id}
    `;

    res.json(user[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port", process.env.PORT);
});