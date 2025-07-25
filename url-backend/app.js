const express = require("express");
const startServer = require("./startServer");
const urlRouter = require("./routes/url");
const userRouter = require("./routes/user");
const app = express();
const cors = require("cors");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use("/url", urlRouter);
app.use("/user", userRouter);

startServer(app);
