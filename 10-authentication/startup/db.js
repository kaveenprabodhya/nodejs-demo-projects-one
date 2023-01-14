const mongoose = require("mongoose");
const { logger } = require("./logger");

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/vidly", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: true,
      useCreateIndex: true,
    })
    .then(() => {
      // console.log("Connected to MongoDB...");
      logger.info(`Connected to MongoDB - ${new Date()}`);
    })
    .catch((err) => console.log("Could not connect to MongoDB...", err));
};
