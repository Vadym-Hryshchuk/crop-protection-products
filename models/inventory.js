const { Schema, model } = require("mongoose");

const inventorySchema = new Schema(
  {
    chemicalId: {
      type: Schema.Types.ObjectId,
      ref: "Chemical",
      required: true,
    },
    currentStock: { type: Number, required: true, default: 0 },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("Inventory", inventorySchema);
