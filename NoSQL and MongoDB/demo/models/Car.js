const { Schema, model } = require('mongoose');

const carSchema = new Schema({
    name: String,
    price: {
        type: Number,
        validate: {
            validator: function (value) {
                return value >= 0;
            },
            message: 'Price cannot be negative!'
        }
    }
})

carSchema.methods.startEngine = function () {
    console.log(`${this.name} goes vroom!`);
}

const Car = model('Car', carSchema);

module.exports = Car;