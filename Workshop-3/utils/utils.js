const bcrypt = require('bcrypt');

function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let randomId = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

function accessoryPreviewModel(accessory) {
  return {
    name: accessory.name,
    description: accessory.description,
    imageUrl: accessory.imageUrl,
    price: accessory.price,
    id: accessory._id,
  }

}

function carPreviewModel(car) {
  const model = {
    name: car.name,
    description: car.description,
    imageUrl: car.imageUrl,
    price: car.price,
    id: car._id,
    accessories: car.accessories
  }
  if (model.accessories.length > 0 && model.accessories[0].name) {
    model.accessories = model.accessories.map(accessoryPreviewModel)
  }
  return model;
}

async function hashPasssword(password) {
  return await bcrypt.hash(password, 10);
}

async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
  carPreviewModel,
  accessoryPreviewModel,
  hashPasssword,
  comparePassword,
} 