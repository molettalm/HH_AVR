const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        id: String,

        first_name: String,
        last_name: String,
        email: String,
        password: String
    }
    {
        collection: "users",
    }
);

module.exports = mongoose.model("users", userSchema);