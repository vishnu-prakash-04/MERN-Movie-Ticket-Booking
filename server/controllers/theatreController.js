import Theatre from "../models/Theatre.js";

export const addTheatre = async (req, res) => {
  try {
    const theatre = await Theatre.create(req.body);

    res.status(201).json({
      message: "Theatre added successfully",
      theatre
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};

export const getTheatres = async (req, res) => {
  try {
    const theatres = await Theatre.find();

    res.status(200).json(theatres);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
};
