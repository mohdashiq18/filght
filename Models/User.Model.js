const mongoose = require("mongoose");
const usersSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UsersModule = mongoose.model("users", usersSchema);
module.exports = {
  UsersModule,
};