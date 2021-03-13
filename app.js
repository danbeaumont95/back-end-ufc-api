const express = require("express");
const app = express();
const homepageRouter = require("./routers/homepage.router");
const apiRouter = require("./routers/api.router");
const cors = require("cors");

app.use(cors());

app.use(express.json());

app.use("/", homepageRouter);

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  // handle custom error
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});
app.use((err, req, res, next) => {
  // handle sql/database error
  if (err.code) {
    res.status(400).send({ msg: err.detail });
  }
});
app.use((err, req, res, next) => {
  // handle server error
  res.sendStatus(500);
});

module.exports = app;
