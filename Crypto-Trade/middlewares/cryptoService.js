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

module.exports = () => (req, res, next) => {
    req.storage = {
        createCryptoOffer,
        getAllCryptos
    }

    next();
}