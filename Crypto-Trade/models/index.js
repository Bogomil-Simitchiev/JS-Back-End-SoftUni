const mongoose = require('mongoose');

require('./User');
require('./Crypto');


const connectionString = `mongodb://localhost:27017/cryptotrade`;

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