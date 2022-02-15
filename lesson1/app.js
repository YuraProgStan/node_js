// const helper = require('./helper')
//
// helper.greeting('Sergii')

// const {greeting} = require('./test/helper')
//
// greeting('Sergii')

// console.log(__dirname, 'app');
// console.log(__filename);
// console.log(process.cwd(), 'process cwd');

// console.log(global.name);
// console.log(name);
// const path = require('path');
// const joinedPath = path.join(__dirname, 'test2', 'files', 'public', 'text.txt');
// const normalizedPath = path.normalize('test///files//public/text.txt')
// console.log(normalizedPath, 'normalized');
// const resolvePath = path.resolve('test///files//public/text.txt');
// console.log( resolvePath, 'resolved');

// const os = require('os');
// // console.log(os.cpus());
// // console.log(os.cpus().length);
// console.log(os.arch());

const fs = require('fs');
const path = require('path');
// fs.writeFileSync(path.join(__dirname, 'files', 'file.txt'), 'SOME DATA')
// fs.writeFile(path.join(__dirname, 'files', 'file2.txt'), 'SOME DATA 2', (err) =>{
//     if (err){
//         console.log(err);
//         throw err;
//     }
// })
// fs.readFile(path.join(__dirname, 'files', 'file2.txt'), 'utf8', (err, data) =>{
//     if (err){
//         console.log(err);
//         throw err;
//     }
//     console.log(data)
// })
// for (let i = 0; i < 1000; i++) {
//     fs.appendFile(path.join(__dirname, 'files', 'file2.txt'), '\nNEW DATA', {flag: 'a'}, (err) =>{
//         if (err){
//             console.log(err);
//             throw err;
//         }
//     })
// }
// fs.truncate(path.join(__dirname, 'files', 'file2.txt'), (err)=>{
//     if(err){
//         console.log(err);
//         throw err;
//     }
// })
// fs.unlink(path.join(__dirname, 'files', 'file2.txt'), (err)=>{
//     if(err){
//         console.log(err);
//         throw err;
//     }
// })
// fs.rmdir(path.join(__dirname, 'test3'),  (err)=>{
//     if(err){
//         console.log(err);
//         throw err;
//     }
// })
// fs.readdir(path.join(__dirname, 'test3'),  (err, data)=>{
//     if(err){
//         console.log(err);
//         throw err;
//     }
//     console.log(data);
// })
fs.rename(path.join(__dirname, 'test3'),path.join(__dirname, 'test4'), (err) => {
    if(err){
        console.log(err);
        throw err;
    }
})