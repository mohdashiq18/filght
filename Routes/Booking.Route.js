const express = require("express");
const { BookingModule } = require("../Models/Booking.Model");
const { UsersModule } = require("../Models/User.Model");
const { FlightModule } = require("../Models/Flight.Model");
const bookingRouter = express.Router();

bookingRouter.use(express.json());



bookingRouter.get("/dashboard", async (req, res) => {
  try {
    
      let data = await BookingModule.find();
      res.status(200).json(data)
    
  } catch (err) {
    console.log("err :>> ", err);
    res.send({ err: err });
  }
});


bookingRouter.post("/booking", async (req, res) => {
  const payload = req.body;
  try {
    let user=payload.user;
    let flight=payload.flight
    const Flight = await FlightModule.findOne({_id:flight});
    const User= await UsersModule.findOne({_id:user})
    const newBooking = new BookingModule({user:User,flight:Flight});
    await newBooking.save();
    res.status(201).json({ newBooking, message: "Book successfully" });
  } catch (err) {
    console.log("err :>> ", err);
    res.send({ msg: err });
  }
});

module.exports = {
    bookingRouter
};