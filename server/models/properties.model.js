import mongoose, { Schema } from "mongoose";
const PropertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 3.5,
    },
    price: {
      org: {
        type: Number,
        required: true,
      },
      mrp: {
        type: Number,
        required: true,
      },
      off: {
        type: Number,
        required: false,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Property", PropertySchema);
