const { Schema, model } = require('mongoose');
const { comparePassword, hashPasssword } = require('../utils/utils');

const userSchema = new Schema({
    username: { type: String, required: true, minlength: 3, unique: true },
    hashedPassword: { type: String, required: true }
})

userSchema.methods.comparePassword = async function (password) {
    return await comparePassword(password, this.hashedPassword);
}

userSchema.pre('save', async function (next) {
    if (this.isModified('hashedPassword')) {
        this.hashedPassword = await hashPasssword(this.hashedPassword);
    }
    next();
})

const User = model('User', userSchema);

module.exports = User;