const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname == '/') {
          fs.createReadStream('./static/index.html').pipe(res);    
    }else if(url.pathname.slice(-5) == '.html'){
        fs.createReadStream(`./static${url.pathname}`).pipe(res);
    }
}).listen(3000);