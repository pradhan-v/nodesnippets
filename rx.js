var Rx = require('rxjs');
Rx.Observable.of(1, 2, 3).map((x) => x + '!!!').subscribe((a) => console.log('a', a));
