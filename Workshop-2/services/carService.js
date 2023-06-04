const Car = require('../models/Car');
const carPreviewModel = require('../utils/utils').carPreviewModel;

async function getAllCars(query) {

    let options = {};

    if (query.search) {
        options.name = new RegExp(query.search, 'i');
    }
    if (query.from) {
        options.price = { $gte: Number(query.from) };
    }
    if (query.to) {
        if (!options.price) {
            options.price = {};
        }
        options.price.$lte = Number(query.to);
    }
    
    const cars = await Car.find(options);

    return cars.map(carPreviewModel);

}

async function getCarById(id) {
    const car = await Car.findById(id).populate('accessories');
    if (car) {
        return carPreviewModel(car);
    } else {
        return undefined;
    }
}

async function deleteCar(id) {
    await Car.findByIdAndDelete(id);
}

async function editCar(id, updatedCar) {
    const car = await Car.findById(id);
    car.name = updatedCar.name;
    car.description = updatedCar.description;
    car.imageUrl = updatedCar.imageUrl;
    car.price = updatedCar.price;
    car.id = updatedCar.id;
    await car.save();
}

async function createCar(car) {
    const currentCar = new Car(car);
    await currentCar.save();
}
async function attachAccessory(carId, accessoryId){
    const car = await Car.findById(carId);
    car.accessories.push(accessoryId);
    await car.save();
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAllCars,
        getCarById,
        createCar,
        deleteCar,
        editCar,
        attachAccessory
    }
    
    next();
}