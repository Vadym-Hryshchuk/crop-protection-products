const { Schema, model } = require("mongoose");

const transactionsSchema = new Schema(
  {
    chemicalId: {
      type: Schema.Types.ObjectId,
      ref: "Chemical",
      required: true,
    },
    type: { type: String, enum: ["income", "expense"], required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    description: { type: String },
  },
  { versionKey: false, timestamps: true }
);

module.exports = model("Transaction", transactionsSchema);
