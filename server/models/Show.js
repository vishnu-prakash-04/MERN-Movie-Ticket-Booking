import mongoose from "mongoose";

const showSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true
    },
    theatre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theatre",
      required: true
    },
    showTime: {
      type: Date,
      required: true
    },
    ticketPrice: {
      type: Number,
      required: true
    },
    bookedSeats: {
      type: [Number],
      default: []
    }
  },
  { timestamps: true }
);

const Show = mongoose.model("Show", showSchema);

export default Show;
