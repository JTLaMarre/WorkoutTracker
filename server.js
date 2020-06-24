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

db.Workout.create({name: "work it out"})
  .then(dbWorkout => {
    console.log(dbWorkout);
  })
  .catch(({ message }) => {
    console.log(message);
  });

// api routes
// =========================================
app.get("/api/workouts", (req,res)=>{
   db.Workout.find({})
   .then(dbWorkout =>{
       res.json(dbWorkout)
   })
   .catch(err => {
    res.json(err);
  });
})
app.get("/api/workouts/range", (req,res) => {
  db.Workout.find({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
});
app.get("/api/workouts/:id",(req,res)=>{
  db.Workout.findOne({_id: req.params.id})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {
    res.json(err);
  });
})
app.post('/api/workouts', (req,res) => {
  db.Workout.create({})
  .then(newWorkout => {
      res.json(newWorkout);
  })
  .catch(err=>{
    res.json(err);
  })
});
app.put("/api/workouts/:id", (req,res) => {
    db.Workout.updateOne( {_id: req.params.id }, {$push: {exercises:  [
      {
      "type" : req.body.type,
      "name" : req.body.name,
      "duration" : req.body.duration,
      "distance" : req.body.distance,
      "weight" : req.body.weight,
      "reps" : req.body.reps,
      "sets" : req.body.sets
      }
    ] 
  }}).then(dbUpdate => {
    res.json(dbUpdate);
  })
  .catch(err => {
    res.json(err);
  });
  
  });
// html routes
// ==============================
app.get("/exercise",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","exercise.html"));
})
app.get("/stats", (req,res) => {
  res.sendFile(path.join(__dirname, "public", "stats.html"));
});
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
// connection to port
// ===========================================
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});