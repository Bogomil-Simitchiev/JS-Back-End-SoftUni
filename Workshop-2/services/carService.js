const fs = require('fs/promises');
const filePath = './services/data.json';
const generateRandomId = require('../utils/utils');
const Car = require('../models/Car');

async function read() {
    try {
        const file = await fs.readFile(filePath);
        return JSON.parse(file);
    } catch (error) {
        console.error("read error");
        console.log(error);
        process.exit(1);
    }
}

async function write(data) {
    try {
        await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("write error");
        console.log(error);
        process.exit(1);
    }
}

async function getAllCars(query) {

    const cars = await Car.find({});
    return cars.map(car => ({
        name: car.name,
        description: car.description,
        imageUrl: car.imageUrl,
        price: car.price,
        id: car._id
    }))

    // const data = await read();
    // let cars = Object.entries(data).map(([id, v]) => Object.assign({}, { id }, v));

    // if (query.search) {
    //    cars = cars.filter(c=>c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()));
    // }
    // if (query.from) {
    //     cars = cars.filter(c=>c.price >= Number(query.from));
    //  }
    //  if (query.to) {
    //     cars = cars.filter(c=>c.price < Number(query.to));
    //  }

    // return cars;
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
    const data = await read();
    if (data.hasOwnProperty(id)) {
        delete data[id];
        await write(data);
    } else {
        return undefined;
    }

}
async function editCar(id, updatedCar) {
    const data = await read();
    data[id] = updatedCar;
    await write(data);
}

async function createCar(data) {
    let cars = await read();
    const id = generateRandomId(12);
    cars[id] = data;
    cars[id].id = id;
    await write(cars);
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