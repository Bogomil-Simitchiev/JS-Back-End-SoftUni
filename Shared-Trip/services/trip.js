const Trip = require('../model/Trip');

async function createOffer(offer) {
    const tripOffer = new Trip(offer);
    await tripOffer.save();
}

async function getAllOffers() {
    return await Trip.find().lean();
}

async function getOfferAndBuddies(id) {
    return await Trip.findById(id).populate('buddies').lean();
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
async function editOffer(id, updatedOffer, ownerId) {
    const offer = await Trip.findById(id);

    if (offer.owner != ownerId) {
        return false;
    }
    offer.start = updatedOffer.start;
    offer.end = updatedOffer.end;
    offer.date = updatedOffer.date;
    offer.time = updatedOffer.time;
    offer.carImage = updatedOffer.carImage;
    offer.carBrand = updatedOffer.carBrand;
    offer.seats = updatedOffer.seats;
    offer.price = updatedOffer.price;
    offer.description = updatedOffer.description;
    offer.owner = updatedOffer.owner;


    await offer.save();
    return true;
}

async function joinTrip(tripId, joinerId, availableSeats, currentSeats) {
    const trip = await Trip.findById(tripId);

    if (trip.owner == joinerId) {
        return false;
    }
    if (trip.buddies.includes(joinerId)) {
        return false;
    }
    if (availableSeats <= currentSeats) {
        return false;
    }

    trip.buddies.push(joinerId);
    await trip.save();

    return true;
}

module.exports = {
    createOffer,
    getAllOffers,
    getAllOffersForCurrentUser,
    getOfferById,
    deleteOfferById,
    editOffer,
    joinTrip,
    getOfferAndBuddies
}