const express = require('express');

const app = express();
app.use(express.json())

const data = [
    {
        id: '12345',
        name: 'Product 1',
        price: '12.53',
    },
    {
        id: '54321',
        name: 'Product 2',
        price: '15.53',
    }
]

app.get('/', (req, res) => {
    res.json({ message: 'Hello' })
})

app.get('/api/catalog', (req, res) => {
    res.json(data);
})
app.get('/api/catalog/:id', (req, res) => {
    const id = req.params.id;
    const product = data.find(r => r.id == id);
    res.json(product);
})
app.put('/api/catalog/:id', (req, res) => {
    const id = req.params.id;

    let i;
    for (let index = 0; index < data.length; index++) {
        if (data[index] == id) {
            i = index;
            break;
        }
    }
    req.body.id = id;
    data[index] = req.body;
    res.end();
})
app.delete('/api/catalog/:id', (req, res) => {
    const id = req.params.id;

    let i;
    for (let index = 0; index < data.length; index++) {
        if (data[index] == id) {
            i = index;
            break;
        }
    }

    data.splice(i, 1);
    res.status(204).end();
})

app.use((req, res, next) => {
    res.json({ message: 'No content' })
});


app.listen(3000, () => console.log('Rest service started on port 3000'));