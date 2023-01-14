const express = require("express");
const app = express();
const morgan = require("morgan");
const { log } = require("./middleware/logger");
const config = require("config");
const debug = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
const courses = require("./routes/courses");
const home = require("./routes/home");

app.set("view engine", "pug");
app.set("views", "./views");

// built in middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/courses", courses);
app.use("/", home);

// sets envioronment variable in cmd -> set DEBUG=app:db, app:startup to view debug messages
// set DEBUG=*

console.log(`Application Name: ${config.get("name")}`);
console.log(`Mail Server: ${config.get("mail.host")}`);
// console.log(`Mail Password: ${config.get("mail.password")}`);

// app_password sets in system environment variables in cmd set app_password = kaveen@123
// we can set NODE_ENV in system variables -> in cmd ---> set NODE_ENV=production

console.log(`Node_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get("env")}`);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan Enabled...");
  debug("Morgan Enabled...");
}

dbDebugger("Connected to the database...");

/* app.use(function (req, res, next) {
  console.log("Logging...");
  next();
});
app.use(function (req, res, next) {
  console.log("Authenticating...");
  next();
}); */
app.use(log);

/* const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.get("/", (req, res) => {
  // res.send("Hello World!!!");
  // sending html template in response
  res.render("index", { title: "ExpressJs", message: "Hello World" });
});

app.get("/api/courses", (req, res) => {
  //   res.send([1, 2, 3]);
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const result = validateCourses(req.body);
  console.log(result);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  // if (!req.body.name || req.body.name < 3) {
  //   res
  //     .status(400)
  //     .send("Name is required and should be minimum 3 charactors.");
  //   return;
  // }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The cource with the given id not found.");

  const result = validateCourses(req.body);
  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  course.name = req.body.name;
  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The cource with the given id not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  //   res.send(req.params.id);
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The cource with the given id not found.");
  res.send(course);
});

app.get("/api/post/:year/:month", (req, res) => {
  //   res.send(req.params);
  res.send(req.query);
});

function validateCourses(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
} */

const port = process.env.PORT || 3000;

// app.listen(3000, () => console.log("Listening on port 3000..."));
app.listen(port, () => console.log(`Listening on port ${port}...`));
