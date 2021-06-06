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
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// update updated_at everytime changed
AgentsModel.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

module.exports = mongoose.model("Agents", AgentsModel); // export as 'Agents' collection name
