const { Schema, model, Types: { ObjectId } } = require('mongoose');

const pattern = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator(value) {
                return pattern.test(value);

            },
            message: 'Email should be valid'
        }
    },
    hashedPassword: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    trips: {
        type: [ObjectId],
        ref: 'Trip',
        default: []
    }


})

userSchema.index({ email: 1 }, {
    unique: true,
    collation: {
        locale: 'en',
        strength: 2
    }
})

const User = model('User', userSchema);

module.exports = User;