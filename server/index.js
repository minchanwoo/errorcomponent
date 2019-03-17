const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const session = require('express-session');

const userRouter = require('./routes/user');

const app = express();
sequelize.sync();

app.set('port', process.env.PORT || 4000);

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session ({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));



app.use('/users', userRouter);

app.listen(app.get('port'), ()=> {
    console.log(app.get('port'), '번에서 대기중~!!');
});