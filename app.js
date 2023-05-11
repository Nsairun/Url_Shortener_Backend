const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotEnv = require("dotenv");
dotEnv.config();

const relate = require("./models/relationship");
relate();
swaggerUi = require("swagger-ui-express");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const urlRouter = require("./routes/urls");
const visitorRouter = require("./routes/visitors");
const specs = require("./modules/services/swagger");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.set("trust proxy", true);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

app.use(logger("dev"));
app.use(express.json());
app.use(cors({
  origin: '*',
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/urls", urlRouter);
app.use("/visitors", visitorRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
