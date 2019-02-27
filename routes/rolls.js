const express = require("express");
const jwt = require('jsonwebtoken');
const router = express.Router();

const Roll = require("../models/Roll");

// @route GET api/rolls
// @desc get all rolls
// @access private
router.get("/", verifyToken, (req, res) => {
  const userEmail = jwt.decode(req.token).email;

  Roll.find({ user_id: userEmail })
    .sort({ date: -1 })
    .then((rolls) => res.status(200).json(rolls))
    .catch((err) => res.status(404).json(err));
});

// @route GET/api/rolls/:id
// @desc gets currently selected roll
// @access private
router.get("/:id", verifyToken, (req, res) => {
  const userEmail = jwt.decode(req.token).email;

  Roll.findOne({ _id: req.params.id, user_id: userEmail })
    .then((roll) => res.status(200).json(roll))
    .catch((err) => res.status(404).json(err));
});

// @route GET/api/rolls/:rollId/exposure/:expId
// @desc gets currently selected exposure
// @access private
router.get("/:rollId/exposure/:expId", verifyToken, (req, res) => {
  const userEmail = jwt.decode(req.token).email;

  Roll.findOne({ _id: req.params.rollId, user_id: userEmail })
    .then((roll) => {
      let exposure = roll.exposures.filter(exposure => exposure._id == req.params.expId);
      res.status(200).json(exposure[0]);
    })
    .catch((err) => res.status(404).json(err));
});

// @route POST api/rolls
// @desc create a new roll
// @access private
router.post("/", verifyToken, (req, res) => {
  const userEmail = jwt.decode(req.token).email;

  const newRoll = new Roll({
    title: req.body.title,
    stock: req.body.stock,
    iso: req.body.iso,
    camera: req.body.camera,
    format: req.body.format,
    tags: req.body.tags,
    notes: req.body.notes,
    user_id: userEmail
  });

  newRoll.save()
    .then((roll) => res.status(201).json(roll))
    .catch((err) => res.status(404).json(err));
});

// @route PATCH api/rolls/:id
// @desc updates roll data
// @access private
router.patch("/:id", verifyToken, (req, res) => {
  const userEmail = jwt.decode(req.token).email;

  Roll.findOneAndUpdate(
    { _id: req.params.id, user_id: userEmail },
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
        Roll.findOne({ _id: req.params.id, user_id: userEmail })
          .then((roll) => res.status(200).json(roll))
          .catch((err) => res.status(404).json(err));
      }
    }
  );
});

// @route PATCH api/rolls/:rollId/exposure/:expId
// @desc updates existing exposure
// @access private
router.patch("/:rollId/exposure/:expId", verifyToken, (req, res) => {
  const userEmail = jwt.decode(req.token).email;

  const updatedExposure = {
    aperture: req.body.aperture,
    date: req.body.date,
    description: req.body.description,
    lens: req.body.lens,
    shutter: req.body.shutter,
    title: req.body.title,
  };

  Roll.findOneAndUpdate(
    { _id: req.params.rollId, user_id: userEmail, "exposures._id": req.params.expId },
    { $set: { "exposures.$": updatedExposure } },
    { new: false, upsert: false },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        Roll.findOne({ _id: req.params.rollId, user_id: userEmail })
          .then((roll) => res.status(200).json(roll))
          .catch((err) => res.status(404).json(err));
      }
    }
  );
});

// @route PUT api/rolls/:id
// @desc adds a new exposure to the current roll
// @access private
router.put("/:id", verifyToken, (req, res) => {
  const userEmail = jwt.decode(req.token).email;

  const newExposure = {
    aperture: req.body.aperture,
    date: req.body.date,
    description: req.body.description,
    lens: req.body.lens,
    shutter: req.body.shutter,
    title: req.body.title
  };

  Roll.findOneAndUpdate(
    { _id: req.params.id, user_id: userEmail },
    { $push: { exposures: newExposure } },
    { new: false, upsert: false },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        Roll.findOne({ _id: req.params.id, user_id: userEmail })
          .then((roll) => res.status(201).json(roll))
          .catch((err) => res.status(404).json(err));
      }
    }
  );
});

// @route DELETE api/rolls/:id
// @desc delete a roll
// @access private
router.delete("/:id", verifyToken, (req, res) => {
  const userEmail = jwt.decode(req.token).email;

  Roll.findOne({ _id: req.params.id, user_id: userEmail })
    .then((roll) => {
      roll.remove().then(() => res.status(200).json({ sucess: true }));
    })
    .catch((err) => res.status(404).json(err));
});

// @route DELETE api/rolls/:rollId/exposure/:expId
// @desc delete an exposure
// @access private
router.delete("/:rollId/exposure/:expId", verifyToken, (req, res) => {
  const userEmail = jwt.decode(req.token).email;

  Roll.findOneAndUpdate(
    { _id: req.params.rollId, user_id: userEmail },
    { $pull: { exposures: { _id: req.params.expId } } },
    (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        Roll.findOne({ _id: req.params.rollId, user_id: userEmail })
          .then((roll) => res.status(200).json(roll))
          .catch((err) => res.status(404).json(err));
      }
    }
  );
});

// format of token
// Authorization: Bearer <access_token>
function verifyToken(req, res, next) {
  // get auth header value
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    // split at the space
    const bearer = bearerHeader.split(' ');
    // get token
    const bearerToken = bearer[1];
    // set token
    req.token = bearerToken;

    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}

module.exports = router;
