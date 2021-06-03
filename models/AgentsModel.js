const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AgentsModel = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: "public/images/default-agent-pic.jpg",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number: {
      type: Number,
      required: true,
      unique: true,
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
  },
  {
    timestamps: {
      updatedAt: "updated_at",
      createdAt: "created_at",
    },
  }
);

module.exports = mongoose.model("AgentsModel", AgentsModel);
