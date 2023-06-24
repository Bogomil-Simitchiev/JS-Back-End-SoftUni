const User = require('../models/User');

async function register(session, username, email, password) {
    const user = new User({
        username,
        email,
        hashedPassword: password
    })
    await user.save();
    session.user = {
        id: user._id,
        username: user.username,
        email: user.email
    }
}

async function login(session, email, password) {
    const user = await User.findOne({ email });

    if (user && await user.comparePassword(password)) {
        session.user = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        return true;
    } else {
        throw new Error('Incorrect email or password!');
    }
}

function logout(session) {
    delete session.user;
}

module.exports = () => (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user,
        res.locals.hasUser = true;
    }

    req.auth = {
        register: (...params) => register(req.session, ...params),
        login: (...params) => login(req.session, ...params),
        logout: () => logout(req.session)
    }

    next();
}