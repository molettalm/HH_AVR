const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    googleId: String // For Google OAuth
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);