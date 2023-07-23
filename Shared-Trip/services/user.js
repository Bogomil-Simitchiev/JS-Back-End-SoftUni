const User = require('../model/User');
const { hash, compare } = require('bcrypt');

async function register(email, password, gender) {
    const existing = await getUserByEmail(email);

    if (existing) {
        throw new Error('Email is taken');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        email,
        hashedPassword,
        gender
    })

    await user.save();

    return user;
}
async function login(email, password) {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('Incorrect email or password!');
    }

    const hasMatch = await compare(password, user.hashedPassword);
    if (!hasMatch) {
        throw new Error('Incorrect email or password!');
    }

    return user;
}

async function getUserByEmail(email) {
    const user = await User.findOne({
        email: new RegExp(`^${email}$`, 'i')
    });

    return user;
}

async function getUserById(userId) {
    return await User.findById(userId).lean();
}

async function putTripOnList(tripId, userId) {
    const user = await User.findById(userId);

    if (user.trips.includes(tripId)) {
        return false;
    }

    user.trips.push(tripId);

    await user.save();

    return true;
}

module.exports = {
    register,
    login,
    getUserById,
    putTripOnList
}