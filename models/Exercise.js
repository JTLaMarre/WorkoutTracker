const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  
    type: {
            type: String,
            required: true,
            trim: true
    },
    name: {
        type:String,
        required: true,
        trim: true
    },
    duration: Number,
    distance:Number,
    weight: Number,
    reps: Number, 
    sets: Number
});


const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;