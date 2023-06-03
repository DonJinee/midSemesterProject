const mongoose = require('mongoose');

const teachersSchema = mongoose.Schema({
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
});

const Teacher = mongoose.model("teachers", teachersSchema)

module.exports = Teacher;