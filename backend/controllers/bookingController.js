const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();

  res.json({ msg: "Booking submitted", booking });
};

exports.getAllBookings = async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json(bookings);
};
