const fs = require('fs/promises');
const filePath = './services/data.json';
const generateRandomId = require('../utils/utils');

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
    const data = await read();
    let cars = Object.entries(data).map(([id, v]) => Object.assign({}, { id }, v));
    
    if (query.search) {
       cars = cars.filter(c=>c.name.toLocaleLowerCase().includes(query.search.toLocaleLowerCase()));
    }
    if (query.from) {
        cars = cars.filter(c=>c.price >= Number(query.from));
     }
     if (query.to) {
        cars = cars.filter(c=>c.price < Number(query.to));
     }

    return cars;
}

async function getCarById(id) {
    const data = await read();
    const car = data[id];
    if (car) {
        return car;
    }else{
        return undefined;
    }
}
async function createCar(data){
    let cars = await read();
    const id = generateRandomId(12);
    cars[id] = data
   await write(cars);
}

module.exports = () => (req, res, next) => {
    req.storage = {
        getAllCars,
        getCarById,
        createCar
    }

    next();
}