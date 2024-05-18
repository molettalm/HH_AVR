const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const infoSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    birth: {type: Date, required: true},
    biological_gender: {type: String, required: true},
    height: {type: Number, required: true, minlength: 1},
}, {
    timestamps: true,
});

const Info = mongoose.models.User || mongoose.model('Info', infoSchema);

module.exports = Info;