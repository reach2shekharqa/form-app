const express = require("express");
const router = express.Router();

const pool = require("../db");

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    const result = await pool.query(
      `
      INSERT INTO forms(name,email)
      VALUES($1,$2)
      RETURNING *
      `,
      [name, email]
    );

    res.status(201).json(result.rows[0]);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: error.message
    });
  }
});

router.get("/", async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT * FROM forms ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(
      "DELETE FROM forms WHERE id = $1",
      [id]
    );

    res.json({
      message: "Record deleted successfully"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const result = await pool.query(
      `
      UPDATE forms
      SET name = $1,
          email = $2
      WHERE id = $3
      RETURNING *
      `,
      [name, email, id]
    );

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;