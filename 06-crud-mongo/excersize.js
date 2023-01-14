const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-excersises", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

const schema = mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", schema);

async function createCourses() {
  const course = new Course({
    name: "Java Spring Course",
    author: "Prabodhya",
    tags: ["spring", "backend"],
    isPublished: true,
    price: 40,
  });

  const result = await course.save();
  console.log(result);
}

async function getCourses() {
  return await Course.find({
    isPublished: true,
    tags: { $in: ["backend", "frontend"] },
    /* price: { $gt: 20 }, */
  })
    .or({
      price: { $gt: 15 },
    })
    .sort("-name")
    .select("name author price");
  // instead of using $in we can use
  // find({isPublished: true}).or([{tags: "backend"}, {tags: "frontend"}])
}

// query first updatingMethod
/* async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;
  // course.isPublished = false;
  // course.author = "another author";
  course.set({
    isPublished: true,
    author: "another author",
  });
  const result = await course.save();
  console.log(result);
} */

// update first updatingMethod
async function updateCourse(id) {
  try {
    //   this method not returning the document
    /* const result = await Course.updateOne(
      { _id: id },
      {
        $set: {
          author: "Kaveen Prabodhya",
          isPublished: false,
        },
      }
    ); */

    const result = await Course.findByIdAndUpdate(
      id,
      {
        $set: {
          author: "Kaveen Prabodhya",
          isPublished: true,
        },
      },
      { new: true }
    );

    console.log(result);
  } catch (err) {
    console.log(new Error("Error ", err));
  }
}

async function deleteCourse(id) {
  try {
    const result = await Course.deleteOne({ _id: id });
    console.log(result);
  } catch (err) {
    console.log(new Error("Error ", err));
  } finally {
    mongoose.connection.close();
  }
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
// createCourses();
// updateCourse("611d323bfeb6a12bbc862a2b");
deleteCourse("611d32e5a08ed53c1ca8121a");
