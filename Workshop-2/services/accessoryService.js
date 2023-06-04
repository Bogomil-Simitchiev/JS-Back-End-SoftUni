const Accessory = require('../models/Accessory');
const accessoryPreview = require('../utils/utils').accessoryPreviewModel;

async function getAllAccessories() {
    const accessories = await Accessory.find({});
    return accessories.map(accessoryPreview);
}

async function createAccessory(accessory) {
    const currentAccessory = new Accessory(accessory);
    await currentAccessory.save();
}


module.exports = () => (req, res, next) => {
    req.accessory = {
        getAllAccessories,
        createAccessory
    }

    next();
}