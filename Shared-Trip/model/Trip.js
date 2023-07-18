const { Schema, model, Types: { ObjectId } } = require('mongoose');

const tripSchema = new Schema({
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    carImage: {
        type: String,
        required: true
    },
    carBrand: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    buddies: {
        type: [ObjectId],
        ref: 'User',
        default: []
    },



})


const Trip = model('Trip', tripSchema);

module.exports = Trip;