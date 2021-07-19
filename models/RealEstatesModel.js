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
    type: { type: String, default: "house" }, // apartment, house-cluster, house, villa
    price: {
      type: String,
      default: "-",
      required: true,
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
    is_renting: {
      type: Boolean,
      default: false,
    },
    bedroom_count: {
      type: Number,
      default: 0,
    },
    bathroom_count: {
      type: Number,
      default: 0,
    },
    building_size: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "-",
    },
    status: {
      type: String,
      default: "available", // available, sold, rented
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
