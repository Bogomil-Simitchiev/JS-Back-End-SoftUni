const Car = require('../models/Car');

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

    console.log(options);
    const cars = await Car.find(options);

    return cars.map(car => ({
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price,
        id: car._id
    }))

}

async function getCarById(id) {
    const car = await Car.findById(id);
    if (car) {
        return ({
            name: car.name,
            description: car.description,
            imageUrl: car.imageUrl,
            price: car.price,
            id: car._id
        });
    } else {
        return undefined;
    }
}

async function deleteCar(id) {
    await Car.findByIdAndDelete(id);
}

async function editCar(id, updatedCar) {
    await Car.findByIdAndUpdate(id, updatedCar);
}

async function createCar(data) {
    const car = new Car(data);
    await car.save();
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAllCars,
        getCarById,
        createCar,
        deleteCar,
        editCar
    }
    
    next();
}