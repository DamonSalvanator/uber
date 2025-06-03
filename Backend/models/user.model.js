// const mongoose = require("mongoose")
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken")
// const userSchema = new mongoose.Schema({
//     fullname: {
//         firstname: {
//             type: String,
//             required: true,
//             minlength: [3, 'First name must be at least 3 characters long']
//         },
//         lastname: {
//             type: String,
//             minlength: [3, 'last name must be at least 3 characters long']
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         minlength: [5, 'Email must be at least 5 characters long']
//     },
//     password: {
//         type: String,
//         required: true,
//         select: false,
//     },
//     socketId: {
//         type: String,

//     },

// })

// userScheam.methods.generateAuthToken = function () {
//     const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
//     return token;

// }
// userScheam.methods.comparePassword = async function () {
//     return await bcrypt.compare(password, this.password);

// }

// userScheam.statics.hashPassword = async function (password) {
//     return await bcrypt.hash(password, 10);
// }

// const userModel=mongoose.model("user",userScheam)

// module.export =userModel

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastname: {
            type: String,
            minlength: [3, 'Last name must be at least 3 characters long']
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
});

// Method to generate JWT token
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
    return token;
};

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
};

// Hash password before saving
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
