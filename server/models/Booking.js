import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    show: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Show",
      required: true
    },
    seats: {
      type: [Number],
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
