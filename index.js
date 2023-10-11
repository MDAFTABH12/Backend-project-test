const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();

mongoose
  .connect(`${process.env.DB}/MAH`)
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());

app.use("/api", require("./routers/userRoute"));

app.listen(process.env.PORT, () => {
  console.log(`Server is working on PORT ${process.env.PORT}`);
});
