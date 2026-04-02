import express from "express";
import sql from "./db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(express.json());

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