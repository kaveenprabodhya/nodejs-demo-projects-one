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
  authors: {
    type: [authorSchema],
    required: true,
  },
});

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function updateAuthor(courseId) {
  const course = await Course.updateOne(
    { _id: courseId },
    {
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

async function addAuthor(courseId, author) {
  const course = await Course.findById(courseId);
  course.authors.push(author);
  course.save();
}

async function removeAuthor(courseId, authorid) {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorid);
  author.remove();
  course.save();
}

// createAuthor("Kaveen", "my Bio", "my website");
/* createCourse("Node Course", [
  new Author({ name: "Kaveen" }),
  new Author({ name: "Prabodhya" }),
  new Author({ name: "Thivanka" }),
]); */
// listCourse();
// updateAuthor("61212aacd17ece44287be62d");
// addAuthor("61212f876e9e8543e04954ed", new Author({ name: "Liyanage" }));
removeAuthor("61212f876e9e8543e04954ed", "612131be6609c121c43b2df0");
