function html(body) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Node.js</title>
    </head>
    <body>
    <nav>
      <a href="/">Home</a> |
      <a href="/about">About</a> |
      <a href="/catalog">Catalog</a> |
      <a href="/contact">Contact</a> |
    </nav>
        ${body}
    </body>
    </html>
    `
}

const data = [
    {
        name:'Product 1',
        price:12
    },
    {
        name:'Product 2',
        price:15
    }
]

module.exports={
    html,
    data
};