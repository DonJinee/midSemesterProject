const mongoose = require('mongoose');
const db1 = require('../db/connect');

const teachersSchema = db1.model("teachers", mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    birthDate: {
        type: String
    },
    employmentDate: {
        type: String
    },
    hobbies: {
        type: String
    },
    comment: {
        type: String
    }
}));

module.exports = teachersSchema;