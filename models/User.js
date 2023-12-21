const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password length is 6']
    },
});

// fire a function after doc saved to db (post means after here)
userSchema.post('save', function (doc, next) {
    console.log('new user was created & saved', doc);
    next();
})

// fire a fuction before doc saved to bd
// this refers to current user
// can only get reference to this by using {} not =>
userSchema.pre('save', function (next) {
    console.log('user about to be created & saved', this)
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;