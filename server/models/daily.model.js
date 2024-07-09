const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dailySchema = new Schema({
    username: { type: String, required: true },
    weight: {type: Number, minlength: 2},
    hours_of_sleep: {type: Number, maxlength: 2},
    blood_pressure_high: {type: Number},
    blood_pressure_low: {type: Number},
    blood_sugar: {type: Number},
    calories_consumed: {type: Number},
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const Daily = mongoose.model('Daily', dailySchema);

module.exports = Daily;