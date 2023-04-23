const file = require('fs');

// read file
const inputFile = file.readFileSync('./input.txt');
console.log(inputFile.toString());

// write file 

const data = JSON.parse(file.readFileSync('./data.json'));

data.job = 'senior developer';
data.age++;

file.writeFileSync('./data.json', JSON.stringify(data, null, 2));