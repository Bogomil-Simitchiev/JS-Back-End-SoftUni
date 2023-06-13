const { Schema, model, Types: { ObjectId } } = require('mongoose');

const accessorySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' },
    imageUrl: { type: String, required: true },
    price: { type: Number, default: 0, min: 0 },
    owner: { type: ObjectId, ref: 'User' }

})

const Accessory = model('Accessory', accessorySchema);

module.exports = Accessory;