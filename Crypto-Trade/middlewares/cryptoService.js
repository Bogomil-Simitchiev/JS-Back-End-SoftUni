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

module.exports = () => (req, res, next) => {
    req.storage = {
        createCryptoOffer,
        getAllCryptos,
        getCryptoById,
        buyCrypto
    }

    next();
}