var http = require('http');

get(process.argv[2]).then((d) => {
    console.log('returning data.');
    return d.toString();
}).then((data) => {
    console.log('got data... ', data);
}).catch((err) => {
    console.log('cot err... ', err);
});

function get(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (resp) => {
            let d = '';
            resp.on('data', (c) => d += c);
            resp.on('end', () => resolve(d));
        }).on('error', (err) => reject(err));
    });
}
