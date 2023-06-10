const bcript = require('bcrypt');

const pass1 = '123456';

let passwords = {}

async function start(){
    const hash1 = await bcript.hash(pass1, 10);
    console.log('Hashing:');
    console.log(hash1);
    
    passwords[hash1] = 'username';
    console.log('------');

    console.log('Confirm:');
    const confirm = await bcript.compare(pass1, hash1);
    console.log(confirm);

    if (passwords.hasOwnProperty(hash1)) {
        console.log(passwords);
    }
}
start();