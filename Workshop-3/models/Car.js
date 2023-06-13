const { Schema, model, Types: { ObjectId } } = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, default: 0, min: 0 },
    accessories: { type: [ObjectId], default: [], ref: 'Accessory' },
    owner : { type: ObjectId , ref: 'User'}
})

const Car = model('Car', carSchema);

module.exports = Car;