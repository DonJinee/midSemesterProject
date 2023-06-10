const { string } = require('joi');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleId:{
        type: String,
        required: true
    },
    displayName: {
        type:String,
        required: true
    },
    firstName: {
        type:String,
        required: true
    },
    lastName: {
        type:String,
        required: true
    },
    image: {
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('teachers-log', userSchema);

module.exports = User;