const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const router = require("./router/index.js");
const path = require("path");
const errorMiddleware = require("./middlewares/error-middleware.js");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(cors({credentials: true, origin: true}));
app.use(cookieParser());
app.use("/api", router);
app.use(errorMiddleware);
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));

const start = async () => {
  try {
      await mongoose.connect(process.env.DB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      })
      app.listen(PORT, () => {
          console.log(`Server started on PORT = ${PORT}`)
      })
  } catch (err) {
      console.log(err);
  }
}

start();