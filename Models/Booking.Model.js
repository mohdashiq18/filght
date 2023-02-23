const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema({
    user : { type: Object, ref: 'User' },
    flight : { type: Object, ref: 'Flight' }
});

const BookingModule = mongoose.model("Booking", bookingSchema);
module.exports = {
  BookingModule,
};