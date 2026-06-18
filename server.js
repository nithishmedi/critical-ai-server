const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Critical AI Server Running");
});

app.listen(3000, () => {
  console.log("Server Started");
});
