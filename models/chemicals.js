const { Schema, model } = require("mongoose");

const chemicalsSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: {
      type: String,
      default: "Цей засіб використовується в процесі обробітку культур",
    },
    unit: { type: String, required: true },
    initialBalances: { type: Number, default: 0 },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("Chemical", chemicalsSchema);
