const express = require('express');
const path = require('path');
const {engine} = require('express-handlebars');
const apiRoutes = require('./routes/apiRoutes');
const app = express();

//Default setup
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'static')));

//Engine setup
app.set('view engine', '.hbs');
app.engine('.hbs', engine({defaultLayout: false}));
app.set('views', path.join(__dirname, 'static'));

//Routes setup
app.use(apiRoutes);

// app.get('/login', (req, res) =>{
//     res.render('login');
// });

// app.get('/users', (req, res)=>{
//     res.render('users',{users});
// });

// app.get('/users/:userId', (req, res)=>{
//    const {userId} = (req.params);
//    console.log(req.query);
//     res.json(users[userId]);
// });


// app.post('/login', (req, res)=>{
//     // console.log(req.body);
//     users.push(req.body);
//     res.redirect('/users');
// });

// app.use((req, res)=>{
//     res.render('notFound');
// });

app.listen(5200, () => {
    console.log('Server has started on PORT 5200');
});