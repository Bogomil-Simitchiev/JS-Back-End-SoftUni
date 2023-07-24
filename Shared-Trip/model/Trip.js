const { Schema, model, Types: { ObjectId } } = require('mongoose');

const tripSchema = new Schema({
    start: {
        type: String,
        required: true,
        minLength: [4, 'Starting point should be at least 4 characters long']
    },
    end: {
        type: String,
        required: true,
        minLength: [4, 'End point should be at least 4 characters long']
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
        required: true,
    },
    carBrand: {
        type: String,
        required: true,
        minLength: [3, 'Car brand should be at least 4 characters long']
    },
    seats: {
        type: Number,
        required: true,
        min: 0,
        max: 4
    },
    price: {
        type: Number,
        required: true,
        min: 1,
        max: 50
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'Description should be at least 10 characters long']
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