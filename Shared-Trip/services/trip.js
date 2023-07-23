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

async function deleteOfferById(id, ownerId) {
    const offer = await Trip.findById(id);

    if (offer.owner != ownerId) {
        return false;
    }

    await Trip.findByIdAndDelete(id);
    return true;
}


module.exports = {
    createOffer,
    getAllOffers,
    getAllOffersForCurrentUser,
    getOfferById,
    deleteOfferById
}