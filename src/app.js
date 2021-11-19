import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/database";
import helmet from "helmet";
import logger from "morgan";
import xss from "xss-clean";
import rateLimit from "express-rate-limit";
import compression from "compression";
import hpp from "hpp";
import log from "./utils/logger";
import mongoSanitize from "express-mongo-sanitize";
import errorMiddleware from "./middlewares/error";
import routes from "./routes/routes";
import exposeService from "./services/index.service";

dotenv.config();

connectDB();
const app = express();

var corsOptions = {
  origin: "http://localhost:5000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,x-auth,Accept,content-type,application/json"
  );
  next();
});

app.use(compression({ filter: shouldCompress }));

function shouldCompress(req, res) {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
}

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

//logger
app.use(logger("combined"));

// Prevent http param pollution
app.use(hpp());

app.use(mongoSanitize());
// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});

app.use(limiter);


// Parse incoming requests data
app.use((req, res, next) => {
  express.json()(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        message: "Invalid JSON payload passed.",
        status: "error",
        data: null,
      });
    }
    next();
  });
});

app.use(express.urlencoded({ extended: true }));
// base api url

app.use("/api/v1", exposeService, routes);

// CATCH ALL INVALID ROUTES
app.use("*", (req, res, next) => {
  res.status(404).json({
    error: "Invalid route",
  });
  next();
});

// Middleware to handle errors
app.use(errorMiddleware);

process.on("uncaughtException", (err) => {
  log.info(err.message);
  process.exit(0);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  log.info(err.message);
  process.exit(0);
});
process.on("unhandledRejection", (err) => {
  log.info(err.message);
  process.exit(0);
});

export default app;
