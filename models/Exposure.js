const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exposureSchema = new Schema({
  date: {
    type: Date,
    default: Date.now
  },
  title: String,
  aperture: Number,
  shutter: String,
  iso: Number,
  lens: String,
  description: String
});

const Exposure = mongoose.model("Exposure", exposureSchema);

module.exports = Exposure;
