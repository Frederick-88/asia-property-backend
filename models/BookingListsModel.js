const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookingListsModel = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Users", // must same as the model's name (exported)
    },
    realEstateId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "RealEstates", // must same as the model's name (exported)
    },
  },
  {
    timestamps: {
      updatedAt: "updated_at",
      createdAt: "created_at",
    },
  }
);

module.exports = mongoose.model("BookingLists", BookingListsModel);
