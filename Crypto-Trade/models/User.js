const { Schema, model } = require('mongoose');

const { comparePassword, hashPasssword } = require('../utils/utils');

const userSchema = new Schema({
    username: { type: String, required: true},
    email: { type: String, required: true},
    hashedPassword: { type: String, required: true},
})

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
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