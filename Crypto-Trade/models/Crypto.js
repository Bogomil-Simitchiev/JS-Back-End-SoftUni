const { Schema, model, Types: { ObjectId } } = require('mongoose');

const cryptoSchema = new Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    payment: { type: String, required: true },
    buyers: { type: [ObjectId], default: [], ref: 'User' },
    owner: { type: ObjectId, ref: 'User' }
})

const Crypto = model('Crypto', cryptoSchema);

module.exports = Crypto;