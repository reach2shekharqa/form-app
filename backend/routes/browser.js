const express = require("express");
const router = express.Router();

const pool = require("../db");

router.post("/", async (req, res) => {
  try {

    const { browserName, version } = req.body;

    const result = await pool.query(
      `
      INSERT INTO browsers(browser_name,version)
      VALUES($1,$2)
      RETURNING *
      `,
      [browserName, version]
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
      "SELECT * FROM browsers ORDER BY id DESC"
    );

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;