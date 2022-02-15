/*Всі дії виконувати з допомогою модулів (вручну нічого не створюємо)
Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson
Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами user ({. name: "Andrii", age: 22, city: "Lviv" }),  відповідно перший - onlineUsers, другий - inPersonUsers;
і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів, але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.

Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу. (ті, що були в папці inPerson будуть в папці online)*/

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