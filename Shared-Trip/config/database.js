const mongoose = require('mongoose');

const dbName = 'sharedtrip'

const connectionString = `mongodb://localhost:27017/${dbName}`;

module.exports = async (app) => {

    try {
        mongoose.connect(connectionString, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log('Database connected');

        mongoose.connection.on('error', (err) => {
            console.error('Database error');
            console.error(err);
        })

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}