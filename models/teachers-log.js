const { string } = require('joi');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    googleId: String
});

const User = mongoose.model('teachers-log', userSchema);

module.exports = User;