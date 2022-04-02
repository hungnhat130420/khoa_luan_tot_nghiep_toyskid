const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const useRouter = require("./routers/index");
const cors = require("cors");
const app = express();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOGB_CONNECT_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected Succsess!!!");
  } catch (error) {
    console.log(error);
    console.log("Connected Failed!!!");
  }
};

connectDB();
app.use(express.json());
app.use(cors());
app.use("/", useRouter);
app.listen(5000, () => console.log("Server started!!!"));
