import Show from "../models/Show.js";
import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { showId, seats } = req.body;

    const show = await Show.findById(showId);

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    // Check if seats already booked
    const alreadyBooked = seats.some(seat =>
      show.bookedSeats.includes(seat)
    );

    if (alreadyBooked) {
      return res.status(400).json({
        message: "Some seats are already booked"
      });
    }

    // Add seats to bookedSeats
    show.bookedSeats.push(...seats);
    await show.save();

    const totalAmount = seats.length * show.ticketPrice;

    const booking = await Booking.create({
      user: req.user._id,
      show: showId,
      seats,
      totalAmount
    });

    res.status(201).json({
      message: "Booking successful",
      booking
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: "show",
        populate: ["movie", "theatre"]
      });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};
