const fs = require('fs');
const path = require('path');

// fs.mkdir(path.join(__dirname, 'main'), (err) => {
//     if(err){
//         console.log(err);
//         throw err;
//     }
// })
// fs.mkdir(path.join(__dirname, 'main', 'online'), (err) =>{
//     if(err){
//         console.log(err);
//         throw err;
//     }
// })
//
// fs.mkdir(path.join(__dirname, 'main', 'inPerson'), (err) =>{
//     if(err){
//         console.log(err);
//         throw err;
//     }
// })
// const onlineUsers = [{name: 'Andrii', age: 22, city: 'Lviv'},
//     {name: 'Anna', age: 25, city: 'Kyiv'},
//     {name: 'Sergii', age: 30, city: 'Kharkiv'}];
// const inPersonUsers = [{name: 'Oleg', age: 32, city: 'Odessa'},
//     {name: 'Oksana', age: 25, city: 'Kyiv'},
//     {name: 'Maksim', age: 31, city: 'Poltava'}]
//
//
// fs.writeFile(path.join(__dirname, 'main', 'online','onlineUsers.txt'), '', (err) => {
//     if(err){
//         console.log(err);
//         throw err;
//     }
// })
//
// fs.writeFile(path.join(__dirname, 'main', 'inPerson','inPersonUsers.txt'), '', (err) => {
//     if(err){
//         console.log(err);
//         throw err;
//     }
// })
//
// onlineUsers.map(value => fs.appendFile (path.join(__dirname, 'main', 'online','onlineUsers.txt'),
//     `NAME:${value.name}, AGE:${value.age}, CITY: ${value.city}\n`, (err) => {
//     if(err){
//         console.log(err);
//         throw err;
//     }
// }) )
//
// inPersonUsers.map(value => fs.appendFile (path.join(__dirname, 'main', 'inPerson','inPersonUsers.txt'),
//     `NAME:${value.name}, AGE:${value.age}, CITY: ${value.city}\n`, (err) => {
//         if(err){
//             console.log(err);
//             throw err;
//         }
//     }) )



const changeUsers = () => {
    fs.rename(path.join(__dirname, 'main', 'online', 'onlineUsers.txt'), path.join(__dirname, 'main', 'inPerson', 'inPersonUsersTemp.txt'), (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        fs.rename(path.join(__dirname, 'main',  'inPerson', 'inPersonUsers.txt'), path.join(__dirname, 'main', 'online', 'onlineUsers.txt'), (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
            fs.rename(path.join(__dirname, 'main',  'inPerson', 'inPersonUsersTemp.txt'), path.join(__dirname, 'main',  'inPerson', 'inPersonUsers.txt'), (err) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            })
        })
    });
}
changeUsers();