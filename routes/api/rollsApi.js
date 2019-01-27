const express = require("express");
const router = express.Router();

const Roll = require("../../models/Roll");
const Exposure = require("../../models/Exposure");

// @route GET api/rolls
// @desc get all rolls
// @access public
router.get("/", (req, res) => {
  Roll.find()
    .sort({ date: -1 })
    .then((rolls) => res.json(rolls));
});

// @route GET/api/rolls/:id
// @desc gets currently selected roll
// @access public
router.get("/:id", (req, res) => {
  Roll.findById(req.params.id).then((roll) => res.json(roll));
});

// @route POST api/rolls
// @desc create a new roll
// @access public
router.post("/", (req, res) => {
  const newRoll = new Roll({
    title: req.body.title,
    stock: req.body.stock,
    iso: req.body.iso,
    camera: req.body.camera,
    format: req.body.format,
    tags: req.body.tags,
    notes: req.body.notes
  });

  newRoll.save().then((roll) => {
    res.json(roll);
  });
});

// @route PUT api/rolls/:id
// @desc adds a new exposure to the current roll
// @access public
router.put("/:id", (req, res) => {
  const newExposure = new Exposure({
    aperture: req.body.aperture,
    date: req.body.date,
    description: req.body.description,
    lens: req.body.lens,
    shutter: req.body.shutter,
    title: req.body.title
  });

  Roll.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { exposures: newExposure } },
    { new: false, upsert: false },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(201).json({ sucess: true });
      }
    }
  );
});

// @route DELETE api/rolls/:id
// @desc delete a roll
// @access public
router.delete("/:id", (req, res) => {
  Roll.findById(req.params.id)
    .then((roll) => {
      roll.remove().then(() => res.json({ sucess: true }));
    })
    .catch((err) => res.status(404).json({ sucess: false }));
});

module.exports = router;
