function after2seconds(x) {
    return new Promise((resolve, reject) => setTimeout(() => resolve(x), 2000));
}
//
async function add1(x) {
    const a = await after2seconds(20);
    console.log('add1, a', a);
    const b = await after2seconds(30);
    console.log('add1, b', b);
    return x + a + b;
}
//
async function add2(x) {
    const a = after2seconds(20);
    console.log('add2, a', a);
    const b = after2seconds(30);
    console.log('add2, b', b);
    return x + await a + await b;
}
//
function check1() {
    const i1 = add1(10);
    return i1.then(console.log);
}
//
function check2() {
    const i2 = add2(100);
    return i2.then(console.log);
}
//
check1().then(check2);
