import Show from "../models/Show.js";

export const addShow = async (req, res) => {
  try {
    const show = await Show.create(req.body);

    res.status(201).json({
      message: "Show added successfully",
      show
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

export const getShowsByMovie = async (req, res) => {
  try {
    const shows = await Show.find({ movie: req.params.movieId })
      .populate("movie")
      .populate("theatre");

    res.status(200).json(shows);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

export const getShowById = async (req, res) => {
  try {
    const show = await Show.findById(req.params.showId)
      .populate("movie")
      .populate("theatre");

    if (!show) {
      return res.status(404).json({ message: "Show not found" });
    }

    res.status(200).json(show);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};
