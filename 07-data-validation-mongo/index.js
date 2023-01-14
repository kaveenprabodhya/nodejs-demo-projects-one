const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-excersises", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.log("Could not connect to MongoDB...", err));

const schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/,
  },
  category: {
    type: String,
    enum: ["Web", "Mobile", "Network"],
    required: true,
    // lowercase: true,
    // uppercase: true,
    // trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      /* isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          const result = v && v.length > 0;
          callback(result);
        }, 4000);
      }, */
      message: "A course should have at least one tag.",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    min: 20,
    max: 200,
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
    // in here arrow function doesnot work because its "this" reference pointing that function not the course object inside schema
    required: function () {
      return this.isPublished;
    },
  },
});

const Course = mongoose.model("Course", schema);

async function createCourses() {
  const course = new Course({
    name: "Java Spring Course",
    category: "-",
    author: "Prabodhya",
    tags: /* [*/ /* "spring", "backend" */ /*] */ null,
    isPublished: true,
    price: 40,
  });

  try {
    const result = await course.save();
    console.log(result);
  } catch (error) {
    // console.log(error.message);
    for (filed in error.errors) console.log(error.errors[filed].message);
  } finally {
    mongoose.connection.close();
  }
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
}

async function updateCourse(id) {
  try {
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

// run();
createCourses();
// updateCourse("611d323bfeb6a12bbc862a2b");
// deleteCourse("611d32e5a08ed53c1ca8121a");
