const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require('path')


const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

db.Workout.create({})
  .then(dbWorkout => {
    console.log(dbWorkout);
  })
  .catch(({ message }) => {
    console.log(message);
  });


app.get("/api/workouts", (req,res)=>{
   db.Workout.find({})
   .then(dbWorkout =>{
       res.json(dbWorkout)
   })
   .catch(err => {
    res.json(err);
  });
})
app.get("/exercise",(req,res)=>{
    res.sendFile(path.join(__dirname,"../WorkoutTracker/public/exercise.html"));
})
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});