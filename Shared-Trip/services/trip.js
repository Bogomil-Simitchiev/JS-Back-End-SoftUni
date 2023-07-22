const Trip = require('../model/Trip');

async function createOffer(offer) {
    const tripOffer = new Trip(offer);
    await tripOffer.save();
}

async function getAllOffers() {
    return await Trip.find().lean();
}

async function getAllOffersForCurrentUser(userId) {
    return await Trip.find({ owner: userId }).lean();
}

async function getOfferById(id) {
    return await Trip.findById(id).lean();
}

module.exports = {
    createOffer,
    getAllOffers,
    getAllOffersForCurrentUser,
    getOfferById
}