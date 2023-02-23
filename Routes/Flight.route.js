const express = require("express");
const { FlightModule } = require("../Models/Flight.Model");

const flightRouter = express.Router();

flightRouter.use(express.json());


flightRouter.get("/flights", async (req, res) => {
  try {
    
      let data = await FlightModule.find();
      res.status(200).json(data)
    
  } catch (err) {
    console.log("err :>> ", err);
    res.send({ err: err });
  }
});

flightRouter.get("/flights/:id", async (req, res) => {
  const id = req.params.id;
  const data = await FlightModule.findById(id);
  res.status(200).json(data);
});



flightRouter.post("/flights", async (req, res) => {
  const payload = req.body;
  try {
    const newFlight = new FlightModule(payload);
    await newFlight.save();
    res.status(201).json({ newFlight, message: "New Flight successfully Added" });
  } catch (err) {
    console.log("err :>> ", err);
    res.send({ msg: err });
  }
});

flightRouter.patch("/flights/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;

  try {
      await FlightModule.findByIdAndUpdate({ _id: id }, payload);
      res.json({status: 204, "message":"Updated The Flight"});
    
  } catch (error) {
    console.log(error);
    res.status(401).json({
        error,
        message: "Something went wrong",
      });
  }
});

flightRouter.delete("/flights/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await FlightModule.findByIdAndDelete({ _id: id });
    res.json({ status: 202, message: "Deleted The Flight" });
  } catch {
    res.send("err");
  }
});

module.exports = {
  flightRouter
};