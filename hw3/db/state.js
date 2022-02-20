const state = {
    // users:[],
    users:[
        {
            firstName: 'Sergii',
            lastName: 'Sidorchuk',
            email: 'test1@gmail.com',
            password: 'passw1',
            age: '20',
            city: 'Kyiv',
            id: 1
        },
        {
            firstName: 'Anna',
            lastName: 'Stetsenko',
            email: 'test2@gmail.com',
            password: 'passw2',
            age: '25',
            city: 'Lviv',
            id: 2
        },
        {
            firstName: 'Maksim',
            lastName: 'Petrenko',
            email: 'test3@gmail.com',
            password: 'passw3',
            age: '32',
            city: 'Rivne',
            id: 3
        },
        {
            firstName: 'Oksana',
            lastName: 'Fedotova',
            email: 'test4@gmail.com',
            password: 'passw4',
            age: '27',
            city: 'Lviv',
            id: 4
        },
        {
            firstName: 'Ostap',
            lastName: 'Fedotova',
            email: 'test5@gmail.com',
            password: 'passw5',
            age: '25',
            city: 'Lviv',
            id: 5
        }
    ],
    wrongEmail:'',
    signUser: []
}
// const users = [];
// let wrongEmail = '';
// const signUser = [];
module.exports = state;