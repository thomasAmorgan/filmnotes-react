const express = require("express");
const router = express.Router();

const Roll = require("../../models/Roll");

// @route GET api/rolls
// @desc get all rolls
// @access public
router.get("/", (req, res) => {
  Roll.find()
    .sort({ date: -1 })
    .then((rolls) => res.status(200).json(rolls));
});

// @route GET/api/rolls/:id
// @desc gets currently selected roll
// @access public
router.get("/:id", (req, res) => {
  Roll.findById(req.params.id)
    .then((roll) => res.status(200).json(roll))
    .catch((err) => res.status(404).json(err));
});

// @route GET/api/rolls/:rollId/exposure/:expId
// @desc gets currently selected exposure
// @access public
router.get("/:rollId/exposure/:expId", (req, res) => {
  Roll.findById(req.params.rollId)
    .then((roll) => {
      let exposure = roll.exposures.filter(exposure => exposure._id == req.params.expId);
      res.status(200).json(exposure[0]);
    })
    .catch((err) => res.status(404).json(err));
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

  newRoll.save()
    .then((roll) => res.status(201).json(roll))
    .catch((err) => res.status(404).json(err));
});

// @route PATCH api/rolls/:id
// @desc updates roll data
// @access public
router.patch("/:id", (req, res) => {
  Roll.findOneAndUpdate(
    { _id: req.params.id },
    {
      title: req.body.title,
      stock: req.body.stock,
      iso: req.body.iso,
      camera: req.body.camera,
      format: req.body.format,
      tags: req.body.tags,
      notes: req.body.notes
    },
    { new: false, upsert: false },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        Roll.findById(req.params.id)
          .then((roll) => res.status(200).json(roll))
          .catch((err) => res.status(404).json(err));
      }
    }
  );
});

// @route PATCH api/rolls/:rollId/exposure/:expId
// @desc updates existing exposure
// @access public
router.patch("/:rollId/exposure/:expId", (req, res) => {
  const updatedExposure = {
    aperture: req.body.aperture,
    date: req.body.date,
    description: req.body.description,
    lens: req.body.lens,
    shutter: req.body.shutter,
    title: req.body.title,
  };

  Roll.findOneAndUpdate(
    { _id: req.params.rollId, "exposures._id": req.params.expId },
    { $set: { "exposures.$": updatedExposure } },
    { new: false, upsert: false },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        Roll.findById(req.params.rollId)
          .then((roll) => res.status(200).json(roll))
          .catch((err) => res.status(404).json(err));
      }
    }
  );
});

// @route PUT api/rolls/:id
// @desc adds a new exposure to the current roll
// @access public
router.put("/:id", (req, res) => {
  const newExposure = {
    aperture: req.body.aperture,
    date: req.body.date,
    description: req.body.description,
    lens: req.body.lens,
    shutter: req.body.shutter,
    title: req.body.title
  };

  Roll.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { exposures: newExposure } },
    { new: false, upsert: false },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        Roll.findById(req.params.id)
          .then((roll) => res.status(201).json(roll))
          .catch((err) => res.status(404).json(err));
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
      roll.remove().then(() => res.status(200).json({ sucess: true }));
    })
    .catch((err) => res.status(404).json(err));
});

// @route DELETE api/rolls/:rollId/exposure/:expId
// @desc delete an exposure
// @access public
router.delete("/:rollId/exposure/:expId", (req, res) => {
  Roll.findOneAndUpdate(
    { _id: req.params.rollId },
    { $pull: { exposures: { _id: req.params.expId } } },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        Roll.findById(req.params.rollId)
          .then((roll) => res.status(200).json(roll))
          .catch((err) => res.status(404).json(err));
      }
    }
  );
})

module.exports = router;
