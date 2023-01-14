const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

const courseSchema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Kaveen",
    tags: ["angular", "Frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  // mongoose written on the top of mongodb library some mongodb properties are as follows
  // these are using for compare a query
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal)
  // lt (less than)
  // lte (less than or equal)
  // in
  // nin (not in)

  // below getting price value greater than or equal to 10 and less than or equal to 20
  // .find({price: { $gte: 10, $lte: 20}})
  // below find method can only get price 10 products
  // .find({price: 10}) but in below we can use to get many products with many prices
  // .find({price: {$in: [10, 15, 20]}})

  // logical operators (and, or)
  // in here we parsing array of objects
  // .find().or([{author: "mosh"}, {isPublished: true}])

  // we can use regex to find a string starts with and ends with
  // starts with mosh name
  // .find({author: /^Mosh/})
  // ends with kaveen name
  // .find({author: /kaveen$/})
  // author name can be anywherer start middile or end (i means charactor sensitive)
  // .find({author: /.*Kaveen.*/i})
  const courses = await Course.find({ author: "Mosh" })
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 })
    .count();
  // to sort descending order set name to -1
  // for example to use a pagination
  // const pageNumber = 2;
  // const pageSize = 10;
  /* const courses = await Course.find({ author: "Mosh" })
    .limit(pageSize)
    .skip((pageNumber - 1) * pageSize)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 }); */
  console.log(courses);
}
// createCourse();
getCourses();
