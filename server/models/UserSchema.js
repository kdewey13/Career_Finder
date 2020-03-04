const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    groupID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    birthDate: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = User = mongoose.model('users', UserSchema)