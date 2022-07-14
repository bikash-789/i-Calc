const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    principalAmount: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 80,
      required: false,
    },
    interestAmount: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
recordSchema.methods = {
  addUserId: function (userId) {
    this.userId = userId;
  },
};
module.exports = mongoose.model("Record", recordSchema);
