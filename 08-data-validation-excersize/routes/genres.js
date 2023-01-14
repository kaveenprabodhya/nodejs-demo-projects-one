const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const { Genre, validate } = require("../models/genre");

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name,
  });
  try {
    await genre.save();
    res.send(genre);
  } catch (ex) {
    console.log(ex.message);
  }
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(400)
      .send({ message: `Cannot update Genre with path id=${id}!` });

  await Genre.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Genre with id=${id}!`,
        });
      } else res.send({ message: "Genre was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Genre with id=" + id,
      });
    });
});

router.delete("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send({ message: `Cannot delete Genre with path id=${req.params.id}!` });

  await Genre.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Genre with id=${req.params.id}.`,
        });
      } else res.send({ message: "Genre was deleted successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error deleting Genre with id=" + req.params.id,
      });
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res
      .status(400)
      .send({ message: `Cannot get Genre with id=${req.params.id}!` });
  await Genre.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Genre with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Genre with id=" + id,
      });
    });
});

module.exports = router;
