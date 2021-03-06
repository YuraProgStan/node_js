const fs = require('fs');
const path = require('path');

//1. Спробуйте створити якийсь файл txt, прочитайте з нього дані і одразу, дані які ви отримали запишіть їх в інший файл, в вас вийде невеликий callback hell, пізніше я вам покажу
// як можна це обійти, але поки зробіть так
let pathTest = path.join(__dirname, 'main1', 'test.txt');
fs.writeFile(pathTest, 'SOME TEXT', err => {
    if(err){
        console.log(err);
        throw err;
    }
    fs.readFile(pathTest, (err, data) => {
        if(err){
            console.log(err);
            throw err;
        }

        fs.writeFile(path.join(__dirname, 'main1', 'test2.txt'), data, err => {
            if (err) {
                console.log(err);
                throw err;
            }
        })
    })
  })

// 2. Створіть файл ( можете вручну ) заповніть його якимись даними
// Прочитайте його, скопіюйте всі дані з нього і перенесіть їх в нову папку та файл в ній, старий файл видаліть після того як все завершиться. Також вийде callback hell
let pathMain2Test = path.join(__dirname, 'main2', 'test.txt');

fs.writeFile(pathMain2Test, 'SOME INTERESTING TEXT ', err => {
    if (err) {
        console.log(err);
        throw err;
    }
    fs.readFile(pathMain2Test, 'utf8', (err, data) => {
        if (err) {
            console.log(err);
            throw err;
        }
        const newData = data;
        fs.mkdir(path.join(__dirname, 'main2', 'files'), err=>{
            if(err){
                console.log(err);
                throw err;
            }
            fs.writeFile(path.join(__dirname, 'main2', 'files','test2.txt'), newData, err=>{
                if(err){
                    console.log(err);
                    throw err;
                }
                fs.unlink(pathMain2Test, err => {
                    if(err){
                        console.log(err);
                        throw err;
                    }
                })
            })
        })

    })
});

// 3. Створіть папку (можете вручну) напишіть скріпт який створить в ній якись дані (можуть бути нові папки і файли(в файли запишіть якусь дату) )
// і напишіть функцію яка буде зчитувати папку і перевіряти якщо дані які в ній лежать - це файли тоді вам потрібно їх очистити, але не видаляти, якщо дані - це папки, вам потрібно їх перейменувати і додати до назви префікс _new
const someData = new Date().toString();
fs.mkdir(path.join(__dirname, 'main3', 'files'), err=>{
    if(err){
        console.log(err);
        throw err;
    }
    fs.writeFile(path.join(__dirname, 'main3','test.txt'), someData, err=> {
        if (err) {
            console.log(err);
            throw err;
        }
        changeFilesFolders();
    })

})



const changeFilesFolders = ()=>{
    fs.readdir(path.join(__dirname, 'main3'),(err, data)=> {
        if (err) {
            console.log(err);
            throw err;
        }
        if(data){
            data.map(value => {
               /* if(value.includes('.txt')){
                    fs.truncate(path.join(__dirname, 'main3', value), err=>{
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                    })
                }*/
                fs.stat(path.join(__dirname, 'main3',value), (err, data)=> {
                    if (err) {
                        console.log(err);
                        throw err;
                    }

                    if (data.isFile()) {
                        fs.truncate(path.join(__dirname, 'main3', value), err => {
                            if (err) {
                                console.log(err);
                                throw err;
                            }
                        })
                    }
                    if (data.isDirectory()) {
                        fs.rename(path.join(__dirname, 'main3', value), path.join(__dirname, 'main3', value + '_new'), err => {
                            if (err) {
                                console.log(err);
                                throw err;
                            }
                        })
                    }
                })
            })
        }
    })
}
