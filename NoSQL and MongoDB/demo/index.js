const mongoose = require('mongoose');

const connectionString = `mongodb://localhost:27017/testdb`;

const carSchema = new mongoose.Schema({
    name:String,
    price:Number
})

carSchema.methods.startEngine = function(){
    console.log(`${this.name} goes vroom!`);
}

const Car = mongoose.model('Car', carSchema);

start();

async function start(){
    await mongoose.connect(connectionString, {
        useUnifiedTopology:true,
        useNewUrlParser:true
    });

    console.log('Database connected');

    const car = new Car({
        name:'Mercedes',
        price:'12500'
    })

    await car.save();

    const data = await Car.find({});
    console.log(data);

    data.forEach(car=>{
        car.startEngine();
    })
}