const express = require("express");
const app = express();
const { logger } = require("./startup/logger");
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

let port = process.env.PORT || 3000;
app.on("connect", function () {
  port++;
});
const server = app.listen(port, () =>
  logger.info(`Listening on port ${port}...`)
);

module.exports = server;
