function  greeting(name){
    console.log(`Hello! My name is ${name}`);
    console.log(process.cwd(), 'process cwd helper');
    console.log(__dirname, 'helper');
    global.name = 'Andrii';

}

module.exports = {greeting}