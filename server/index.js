const express = require("express");
const router = require("./routes");
const cors = require("cors");
require("dotenv").config();

// db config
require("./database");
require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
