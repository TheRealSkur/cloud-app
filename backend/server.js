const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const tasks = [
  { id: 1, title: "Zrobić frontend", completed: false },
  { id: 2, title: "Połączyć z backendem", completed: true },
  { id: 3, title: "Dodać Dockera", completed: false }
];

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(8081, () => {
  console.log("Backend działa na porcie 8081");
});