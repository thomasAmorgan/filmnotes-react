const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const Tags = new Schema({
//   tag: String
// });

// const Exposure = new Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: Date,
//     default: Date.now
//   },
//   aperture: {
//     type: String
//   },
//   shutterSpeed: {
//     type: String
//   },
//   lens: {
//     type: String
//   },
//   location: {
//     type: String
//   },
//   tags: [Tags]
// });

// const RollSchema = new Schema({
//   title: {
//     type: String,
//     required: true
//   },
//   dateStart: {
//     type: Date,
//     default: Date.now
//   },
//   dateEnd: {
//     type: Date
//   },
//   filmType: {
//     type: String
//   },
//   filmIso: {
//     type: String
//   },
//   filmBrand: {
//     type: String
//   },
//   filmFormat: {
//     type: String
//   },
//   camera: {
//     type: String
//   },
//   notes: {
//     type: String
//   },
//   tags: [Tags],
//   exposures: [Exposure]
// });
const RollSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  dateStart: {
    type: Date,
    default: Date.now
  }
});

module.exports = Roll = mongoose.model("roll", RollSchema);
