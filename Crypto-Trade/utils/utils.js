const bcrypt = require('bcrypt');

async function hashPasssword(password) {
  return await bcrypt.hash(password, 10);
}

async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

function cryptoPreview(offer) {
  const model = {
    name: offer.name,
    description: offer.description,
    imageUrl: offer.imageUrl,
    price: offer.price,
    id: offer._id,
    payment: offer.payment,
    owner: offer.owner
  }
  return model;
}

function isLoggedIn() {
  return function (req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }
}

module.exports = {
  hashPasssword,
  comparePassword,
  isLoggedIn,
  cryptoPreview
} 