const { Schema, model } = require("mongoose");

const chemicalsSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: {
      type: String,
      default: "Цей засіб виористовується в процесі обробітку культур",
    },
    unit: { type: String, required: true },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("Chemical", chemicalsSchema);
