require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT
const bodyParser = require('body-parser');
const api = require('./routes/api')
const auth = require('./routes/auth')
const mongoose  = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session');
const passportSetup = require('./config/passport');
const path = require('path')
mongoose.connect( process.env.MONGODB,{ useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
    console.log('Connection Successful');
}).catch((error)=>{     
    console.log('Something went wrong', error)
});


app.use(
    cookieSession({
        name:'session',
        keys :['fire'],
        maxAge: 24*60*60*100,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: 'GET,POST,PUT,DELETE',
        credentials:true
    })
)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api',api);
app.use('/auth',auth);
global.appRoot = path.resolve(__dirname);
app.use('/uploads',express.static('uploads'));
app.listen(PORT, ()=>console.log(`Listening to ${PORT}`))