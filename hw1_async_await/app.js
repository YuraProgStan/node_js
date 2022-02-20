/*Всі дії виконувати з допомогою модулів (вручну нічого не створюємо)
Створити основну папку (main), в яку покласти дві інші папки: перша - online, друга - inPerson
Потім створити в вашому головному файлі (для прикладу app.js) два масиви з обєктами user ({. name: "Andrii", age: 22, city: "Lviv" }),  відповідно перший - onlineUsers, другий - inPersonUsers;
і створити файли txt в папках (online, inPerson) в яких як дату покласти юзерів з ваших масивів, але щоб ваш файл виглядав як NAME: ім'я з обєкту і т.д і всі пункти з нового рядка.

Коли ви це виконаєте напишіть функцію яка буде міняти місцями юзерів з одного файлу і папки в іншу. (ті, що були в папці inPerson будуть в папці online)*/

const fsPromises = require('fs/promises');
// const fsPromises2 = require('fs').promises;
const path = require('path');
// const util = require('util');
const fs = require('fs');
// const mkDir = util(fs.mkdir);

const onlineUsers = [
    {name: 'Andrii', age: 22, city: 'Lviv'},
    {name: 'Anna', age: 25, city: 'Kyiv'},
    {name: 'Sergii', age: 30, city: 'Kharkiv'}];
const inPersonUsers = [
    {name: 'Oleg', age: 32, city: 'Odessa'},
    {name: 'Oksana', age: 25, city: 'Kyiv'},
    {name: 'Maksim', age: 31, city: 'Poltava'}];
const mainPath = path.join(__dirname, 'main');

async function createData() {
    await fsPromises.mkdir(mainPath);
    await Promise.all([
            fsPromises.mkdir(path.join(mainPath, 'inPerson')),
            fsPromises.mkdir(path.join(mainPath, 'online')),
            writeAndAppendFile('inPerson', inPersonUsers),
            writeAndAppendFile('online', onlineUsers),
            swap('online', 'inPerson')
        ]
    )
}

async function writeAndAppendFile(pathFolder, users) {
    const data = users.map(({name, age, city}) => `NAME: ${name}\nAGE: ${age}\nCITY: ${city}\n\n`).join('');
    return fsPromises.writeFile(path.join(mainPath, pathFolder, 'user.txt'), data);
}

async function swap(firstFolder, secondFolder) {
    try {
        const [dataFromFirstFile, dataFromSecondFile] = await Promise.all([
            fsPromises.readFile(path.join(mainPath, firstFolder, 'user.txt'), 'utf8'),
            fsPromises.readFile(path.join(mainPath, secondFolder, 'user.txt'), 'utf8')
        ]);
        await Promise.all([
            fsPromises.appendFile(path.join(mainPath, firstFolder, 'user.txt'), dataFromSecondFile, {flag: 'w'}),
            fsPromises.appendFile(path.join(mainPath, secondFolder, 'user.txt'), dataFromFirstFile, {flag: 'w'})
        ])
    } catch (err) {
        console.log(err)
    }
}

// createData();
// fs.stat(path.join(mainPath, 'online', 'user.txt'), (err, data) =>{
//     console.log(data);
//     console.log(data.isFile());
//     console.log(data.isDirectory());
// })

// console.log(path.parse(path.join(mainPath, 'online', 'user.txt')));
if(!path.extname(mainPath)){
    console.log('directory')
}
console.log(path.extname(path.join(mainPath, 'online', 'user.txt')));










