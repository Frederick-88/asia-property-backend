const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WishlistsModel = new Schema(
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

// update updated_at everytime changed
WishlistsModel.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Wishlists", WishlistsModel);
