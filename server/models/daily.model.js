const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const dailySchema = new Schema({
    username: { type: String, required: true },
    weight: {type: Number, required: true, minlength: 1},
    hours_of_sleep: {type: Number, required: true, maxlength: 2},
    blood_pressure: {type: Number, required: true},
    blood_sugar: {type: Number, required: true},
    calories_consumed: {type: Number, required: true},
}, {
    timestamps: true,
});

const Daily = mongoose.model('Daily', dailySchema);

module.exports = Daily;