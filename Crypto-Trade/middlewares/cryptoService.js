const Crypto = require('../models/Crypto');
const { cryptoPreview } = require('../utils/utils');

async function createCryptoOffer(offer) {
    const currentCryptoOffer = new Crypto(offer);
    await currentCryptoOffer.save();
}
async function getAllCryptos() {
    const cryptos = await Crypto.find();
    return cryptos.map(cryptoPreview);
}
async function getCryptoById(id) {
    const crypto = await Crypto.findById(id);

    if (crypto) {
        return cryptoPreview(crypto);
    } else {
        return undefined;
    }
}

async function buyCrypto(cryptoId, ownerId) {
    const crypto = await Crypto.findById(cryptoId);

    if (crypto.owner == ownerId) {
        return false;
    }

    crypto.buyers.push(ownerId);
    await crypto.save();

    return true;
}

async function editOffer(id, updatedOffer, ownerId) {
    const offer = await Crypto.findById(id);

    if (offer.owner != ownerId) {
        return false;
    }
    offer.name = updatedOffer.name;
    offer.description = updatedOffer.description;
    offer.imageUrl = updatedOffer.imageUrl;
    offer.price = updatedOffer.price;
    offer.payment = updatedOffer.payment;
    offer.id = updatedOffer.id;

    await offer.save();
    return true;
}
async function deleteOffer(id, ownerId) {
    const offer = await Crypto.findById(id);

    if (offer.owner != ownerId) {
        return false;
    }

    await Crypto.findByIdAndDelete(id);
    return true;
}

async function getCryptosBySearch(body) {
    let options = {};

    if (body.name) {
        options.name = new RegExp(body.name, 'i');
    }
    if (body.payment) {
        options.payment = new RegExp(body.payment, 'i');
    }

    const cryptos = await Crypto.find(options);
    return cryptos.map(cryptoPreview);
}

module.exports = () => (req, res, next) => {
    req.storage = {
        createCryptoOffer,
        getAllCryptos,
        getCryptoById,
        buyCrypto,
        editOffer,
        deleteOffer,
        getCryptosBySearch
    }

    next();
}