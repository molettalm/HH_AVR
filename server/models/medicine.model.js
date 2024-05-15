const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const medicineSchema = new Schema({
    username: { type: String, required: true },
    medicine_name: { type: String, required: true },
    period: { type: Number, required: true },
    first_intake: {type: Date, required: true },

}, {
    timestamps: true,
});

const Medicine = mongoose.model('Medicine', medicineSchema);

module.exports = Medicine;