
import mongoose from "mongoose";
import log from "../utils/logger";

import {
  NODE_ENV,
  MONGO_DB_URL_DEV,
  MONGO_DB_URL_TEST,
  MONGO_DB_URL_STAGING,
  MONGO_DB_URL_PROD,
} from "./config";

const conn = mongoose.connection;
const connectDB = async () => {
  let connectionUrl;
  if (NODE_ENV === "development") {
    connectionUrl = MONGO_DB_URL_DEV;
  } else if (NODE_ENV === "test") {
    connectionUrl = MONGO_DB_URL_TEST;
  } else if (NODE_ENV === "staging") {
    connectionUrl = MONGO_DB_URL_STAGING;
  } else if (NODE_ENV === "production") {
    connectionUrl = MONGO_DB_URL_PROD;
  }

  mongoose.connect(
    connectionUrl,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err) {
        log.error(err);
      }

      log.info(`Connected to Database running on ${conn.host}`);
    }
  );


  process.on("SIGINT", async () => {
    await mongoose.connection.close(); //close DB
    log.info(`Shutting down DB Server`);
    log.info(`DB Server successfully shut down`);
    process.exit(0);
  });
};
module.exports = connectDB;
