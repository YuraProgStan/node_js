/*Всі дії виконувати з допомогою модулів (вручну нічого не створюємо)
Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson
Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами user ({. name: "Andrii", age: 22, city: "Lviv" }),  відповідно перший - onlineUsers, другий - inPersonUsers;
і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів, але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.

Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу. (ті, що були в папці inPerson будуть в папці online)*/

const fs = require('fs');
const path = require('path');

const onlineUsers = [{name: 'Andrii', age: 22, city: 'Lviv'},
    {name: 'Anna', age: 25, city: 'Kyiv'},
    {name: 'Sergii', age: 30, city: 'Kharkiv'}];
const inPersonUsers = [{name: 'Oleg', age: 32, city: 'Odessa'},
    {name: 'Oksana', age: 25, city: 'Kyiv'},
    {name: 'Maksim', age: 31, city: 'Poltava'}];
const mainPath = path.join(__dirname, 'main');

fs.mkdir(mainPath, (err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    const folderFileArrayWrite = (folder, file, arr) => {
        fs.mkdir(path.join(mainPath, folder), (err) => {
            if (err) {
                console.log(err);
                throw err;
            }
            const pathUsers = path.join(mainPath, folder, file);
            const data = arr.map(({name, age, city}) => `NAME: ${name}\nAGE: ${age}\nCITY: ${city}\n\n`).join('');
            fs.writeFile(pathUsers, data, (err) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                if (folder === 'inPerson') {
                    changeUsers()
                }
            })
        })
    }
    folderFileArrayWrite('online', 'onlineUsers.txt', onlineUsers);
    folderFileArrayWrite('inPerson', 'inPersonUsers.txt', inPersonUsers);
})

const changeUsers = () => {
    let data1, data2;
    fs.readFile(path.join(mainPath, 'online', 'onlineUsers.txt'), 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        data1 = data;
        fs.readFile(path.join(mainPath, 'inPerson', 'inPersonUsers.txt'), 'utf8', (err, data) => {
            if (err) {
                console.log(err);
                throw err;
            }
            data2 = data;
            fs.appendFile(path.join(mainPath, 'online', 'onlineUsers.txt'), data2, {flag: 'w'}, err => {
                if (err) {
                    console.log(err);
                    throw  err;
                }
            });
            fs.appendFile(path.join(mainPath, 'inPerson', 'inPersonUsers.txt'), data1, {flag: 'w'}, err => {
                if (err) {
                    console.log(err);
                    throw  err;
                }
            });
        })

    })
    // fs.rename(path.join(__dirname, 'main', 'online', 'onlineUsers.txt'), path.join(__dirname, 'main', 'inPerson', 'inPersonUsersTemp.txt'), (err) => {
    //     if (err) {
    //         console.log(err);
    //         throw err;
    //     }
    //     fs.rename(path.join(__dirname, 'main', 'inPerson', 'inPersonUsers.txt'), path.join(__dirname, 'main', 'online', 'onlineUsers.txt'), (err) => {
    //         if (err) {
    //             console.log(err);
    //             throw err;
    //         }
    //         fs.rename(path.join(__dirname, 'main', 'inPerson', 'inPersonUsersTemp.txt'), path.join(__dirname, 'main', 'inPerson', 'inPersonUsers.txt'), (err) => {
    //             if (err) {
    //                 console.log(err);
    //                 throw err;
    //             }
    //         })
    //     })
    // });
}













