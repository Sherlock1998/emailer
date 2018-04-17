const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/bye", (req, res) => {
  res.send("bye");
});

app.listen(PORT);
