const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  releaseDate: Date,
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  shows: [{ type: mongoose.Schema.Types.ObjectId, ref: "Show" }] // Reference to Show collection
});

module.exports = mongoose.model("Movie", movieSchema);
