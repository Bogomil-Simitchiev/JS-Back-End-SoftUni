const mongoose = require('mongoose');

require('./Car');
require('./Accessory');

const connectionString = `mongodb://localhost:27017/carbicle`;

async function initialize() {

    try {
        await mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            autoIndex: false
        });

        console.log('Database connected');

    } catch (error) {
        console.log(error);
        process.exit(1);
    }

}
module.exports = initialize;