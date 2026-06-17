require("dotenv").config();

const express = require("express");
const cors = require("cors");

const formsRoute = require("./routes/forms");
const browsersRoute = require("./routes/browser");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/forms", formsRoute);
app.use("/api/browsers", browsersRoute);

app.get("/", (req, res) => {
  res.json({
    status: "API Running"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});