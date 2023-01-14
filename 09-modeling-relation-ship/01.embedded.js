const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database..."))
  .catch((err) => console.log("Could not connect ot mongoDB", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model("Course", {
  name: String,
  author: {
    type: authorSchema,
    required: true,
  },
});

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function updateAuthor(courseId) {
  //   const course = await Course.findById(courseId);
  //   course.author.name = "Kaveen Thivanka";
  const course = await Course.updateOne(
    { _id: courseId },
    {
      /* $set: {
        "author.name": "John Smith",
      }, */
      $unset: {
        auhtor: "",
      },
    }
  );
}

async function listCourse() {
  const result = await Course.find()
    .populate("author", "name -_id")
    .select("name author");
  console.log(result);
}

// createAuthor("Kaveen", "my Bio", "my website");
// createCourse("Node Course", new Author({ name: "Kaveen" }));
// listCourse();

updateAuthor("61212aacd17ece44287be62d");
