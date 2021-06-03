const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RealEstatesModel = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    agentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "AgentsModel", // must same as the model's name (exported)
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "BookingListsModel", // must same as the model's name (exported)
    },
    images: { type: Array, default: [] },
    type: { type: Array, default: [] }, // apartment, cluster, house, homestay
    price: {
      type: Number,
      default: 0,
      required: true,
    },
    is_booking_available: {
      type: Boolean,
      default: false,
    },
    booking_fee: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "available", // available, sold, rented, renting
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

module.exports = mongoose.model("RealEstatesModel", RealEstatesModel);
