if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const app = express();

console.log(process.env.NODE_ENV || "development");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routers"));
app.use(require("./middlewares/errorHandler"));

module.exports = app;
