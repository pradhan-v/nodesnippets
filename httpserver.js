var http = require('http');
var path = require('path');
var fs = require('fs');
var url = require('url');

const host = 'localhost';
const port = 3000;
const publicDir = './public';
const filepath404 = path.resolve(publicDir, '404.html');

const handleRequest = function (req, res) {
    console.log(req.method, req.url);
    let urlpath = url.parse(req.url).pathname;
    if (urlpath.startsWith(path.sep)) {
        urlpath = urlpath.substr(1);
    }
    console.log('urlpath', urlpath);
    const filepath = path.resolve(publicDir, urlpath);
    sendFile(res, filepath, 200, () => {
        sendFile(res, filepath404, 404)
    });
}

const sendFile = function (res, filepath, status, errCallback) {
    setHeaders(res, status);
    console.log('file', filepath);
    const rs = fs.createReadStream(filepath, {
        'autoClose': true
    });
    rs.on('error', (err) => {
        console.log('err', err.message);
        errCallback(err);
    });
    rs.pipe(res);
}

const setHeaders = function (res, status) {
    res.statusCode = status;
    res.setHeader('Content-Type', 'text/html');
}

const server = http.createServer((req, res) => {
    handleRequest(req, res);
});

server.listen(3000, 'localhost', () => {
    console.log(`http server started at http://${host}:${port}`);
});
