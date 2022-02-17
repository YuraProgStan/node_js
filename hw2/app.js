// 1. /login, поля які треба відрендерити в файлі hbs: firstName, lastName, email(унікальне поле), password, age, city
// просто зробити темплейт з цим усім і вводити свої дані які будуть пушитися в масив і редірект робити на сторінку з усіма юзерами /users і перевірка чи такий імейл не існує, якщо існує то редірект на еррор пейдж
// 2. /users просто сторінка з усіма юзерами, але можна по квері параметрам їх фільтрувати по age і city
// 3. /user/:id сторінка з інфою про одного юзера
//
// 4. зробити якщо не відпрацюють ендпоінти то на сторінку notFound редірект

// Необхідно розширити ваше ДЗ:
//     - додайте ендпоінт signIn який буде приймати email і password і якщо все вірно то редірект на сторінку цього
//
// * хто хоче складніше реалізуйте видалення користувача. Кнопка повинна знаходитись на сторінці з інфою про одного юзера. Після видалення редірект на "/users"

const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');

const users = [
    {
        firstName: 'Sergii',
        lastName: 'Sidorchuk',
        email: 'test1@gmail.com',
        password: 'passw1',
        age: '20',
        city: 'Kyiv'
    },
    {
        firstName: 'Anna',
        lastName: 'Stetsenko',
        email: 'test2@gmail.com',
        password: 'passw2',
        age: '25',
        city: 'Lviv'
    },
    {
        firstName: 'Maksim',
        lastName: 'Petrenko',
        email: 'test3@gmail.com',
        password: 'passw3',
        age: '32',
        city: 'Rivne'
    },
    {
        firstName: 'Oksana',
        lastName: 'Fedotova',
        email: 'test4@gmail.com',
        password: 'passw4',
        age: '27',
        city: 'Lviv'
    },
    {
        firstName: 'Ostap',
        lastName: 'Fedotova',
        email: 'test5@gmail.com',
        password: 'passw5',
        age: '25',
        city: 'Lviv'
    }
];
let wrongEmail = '';
const signUser = [];
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));
app.get('/login', (req, res) => {
    res.render('login');
})
app.get('/users', (req, res) => {
    let newUsers;
    if (req.query.age && req.query.city) {
        newUsers = users.filter(value => value.age === req.query.age && value.city === req.query.city)
    } else if (req.query.age) {
        newUsers = users.filter(value => value.age === req.query.age)
    } else if (req.query.city) {
        newUsers = users.filter(value => value.city === req.query.city)
    } else {
        res.render('users', {users});
    }
    res.render('users', {users: newUsers});

});

app.get('/user', (req, res) => {
    res.render('user', {user: signUser});
});

app.get('/user/:userId', (req, res) => {
    const {userId} = (req.params);
    const user = [users[userId - 1]];
    res.render('user', {user});
});

app.get('/error', (req, res) => {
    res.render('error', {email: wrongEmail});
});

app.get('/signIn', (req, res) => {
    res.render('signIn');
});

app.get('/wrongSignIn', (req, res) => {
    res.render('wrongSignIn');
});

app.post('/login', (req, res) => {
    if (users.find(value => value.email === req.body.email)) {
        wrongEmail = req.body.email;
        res.redirect('error');
    } else {
        users.push(req.body);
        res.redirect('users');
    }
});

app.post('/signIn', (req, res) => {
    if (users.find(value => value.email === req.body.email && value.password === req.body.password)) {
        const find = users.find(value => value.email === req.body.email);
        signUser.push(find);

        res.redirect('user');
    } else {
        res.redirect('wrongSignIn');
    }

});

app.post('/user', (req, res) => {
    const indexUsers = users.findIndex(value => value.email === req.body.email);
    users.splice(indexUsers, 1);
    const indexSignUser = signUser.findIndex(value => value.email === req.body.email);
    signUser.splice(indexSignUser, 1);
    res.redirect('users');
});

app.use((req, res) => {
    res.render('notFound');
});

app.listen(5200, () => {
    console.log('Server has started on PORT 5200')
});
