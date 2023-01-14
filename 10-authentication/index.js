const express = require("express");
const app = express();
const { logger } = require("./startup/logger");
require("./startup/logging")();
require("./startup/db")();
require("./startup/routes")(app);
require("./startup/config")();
require("./startup/validation")();

// this method is synchronous method and not handeling promis rejects
/* process.on("uncaughtException", (ex) => {
  console.log("We got an uncaught exception");
  logger.error(`${ex.message} - ${ex.stack}`);
}); */

// throw new Error("Somthing faild during startup.");

/* process.on("unhandledRejection", (ex) => {
  // console.log("We got an unhandle rejection");
  // logger.error(`${ex.message} - ${ex.stack}`);
  // after setting logger exception handle
  throw ex;
}); */

/* const p = Promise.reject(new Error("Something failed miserably."));
p.then(() => console.log("Done.")); */

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`Listening on port ${port}...`));
