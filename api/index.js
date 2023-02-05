const express = require("express");
const route = require("./routes");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "../.env" });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/", route);

app.listen(5000, () => {
  console.log(`Server Started: http://localhost:${5000}`);
});
