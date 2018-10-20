const express = require("express");
const router = express.Router();

const Roll = require("../../models/Roll");

// @route GET api/rolls
// @desc get all rolls
// @access public
router.get("/", (req, res) => {
  Roll.find()
    .sort({ dateStart: -1 })
    .then(rolls => res.json(rolls));
});

// @route POST api/rolls
// @desc create a new roll
// @access public
router.post("/", (req, res) => {
  const newRoll = new Roll({
    title: req.body.title
  });

  newRoll.save().then(roll => {
    res.json(roll);
  });
});

module.exports = router;
