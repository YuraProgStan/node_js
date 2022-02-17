const fs = require('fs');
const path = require('path');
// const readStream = fs.createReadStream(path.join(__dirname, 'test.txt'));
//
// readStream.on('data', chunk => {
//     console.log(chunk.toString());
// })

const readStream = fs.createReadStream(path.join(__dirname, 'test.txt'));
const writeStream = fs.createWriteStream(path.join(__dirname, 'fileTest.txt'));
// for (let i = 0; i < 100; i++) {
//     writeStream.write('NEW SOME DATA \n', err => {
//         if(err){
//             console.log(err);
//             throw err;
//         }
//         writeStream.end();
//     })
// }
readStream.pipe(writeStream);




// readStream.on('data', (chunk )=> {
//         writeStream.write(chunk, (err) => {
//             if(err){
//                 console.log(err);
//                 throw err;
//             }
//             writeStream.end();
//         });
//
// });

// const {EventEmitter} = require('events');
// const ee = new EventEmitter();
//
// ee.on('Log', (name) => {
//     console.log(`Log is working!!! ${name}`)
// })
// ee.once('Test', ()=>{
//     console.log('Once is working!!!')
// })
//
// ee.emit('Log', 'Oleg');
// ee.emit('Log', 'Oleg');
// ee.emit('Log', 'Oleg');
// ee.emit('Log', 'Oleg');
// ee.emit('Log', 'Oleg');
// ee.emit('Log', 'Oleg');
//
// ee.emit('Test');
// ee.emit('Test');
// ee.emit('Test');
// ee.emit('Test');
//
// console.log(ee.eventNames());