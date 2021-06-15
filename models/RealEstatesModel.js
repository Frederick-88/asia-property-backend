const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RealEstatesModel = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    agent: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Agents", // must same as the model's name (exported)
    },
    images: { type: Array, default: [] },
    type: { type: Array, default: [] }, // apartment, cluster, house, homestay
    price: {
      type: String,
      default: "-",
      required: true,
    },
    is_booking_available: {
      type: Boolean,
      default: false,
    },
    booking_fee: {
      type: String,
      default: "-",
    },
    bedroom: {
      type: Number,
      default: 0,
    },
    bath: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "-",
    },
    rating: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "available", // available, sold, rented, renting, booked
    },
    country: {
      type: String,
      default: "",
      required: true,
    },
    city: {
      type: String,
      default: "",
      required: true,
    },
    address: {
      type: String,
      default: "",
      required: true,
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
RealEstatesModel.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("RealEstates", RealEstatesModel);
