const express = require("express");
const router = express.Router();

const Roll = require("../../models/Roll");

// @route GET api/rolls
// @desc get all rolls
// @access public
router.get("/", (req, res) => {
  Roll.find()
    .sort({ date: -1 })
    .then(rolls => res.json(rolls));
});

// @route GET/api/rolls/:id
// @desc gets currently selected roll
// @access public
router.get("/:id", (req, res) => {
  Roll.findById(req.params.id).then(roll => res.json(roll));
});

// @route POST api/rolls
// @desc create a new roll
// @access public
router.post("/", (req, res) => {
  const newRoll = new Roll({
    title: req.body.title,
    stock: req.body.stock,
    iso: req.body.iso,
    pushedOrPulled: req.body.pushedOrPulled,
    camera: req.body.camera,
    format: req.body.format,
    tags: req.body.tags,
    notes: req.body.notes,
    exposures: req.body.exposures
  });

  newRoll.save().then(roll => {
    res.json(roll);
  });
});

// @route DELETE api/rolls/:id
// @desc delete a roll
// @access public
router.delete("/:id", (req, res) => {
  Roll.findById(req.params.id)
    .then(roll => {
      roll.remove().then(() => res.json({ sucess: true }));
    })
    .catch(err => res.status(404).json({ sucess: false }));
});

module.exports = router;
