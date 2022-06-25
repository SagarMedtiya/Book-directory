require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT
const bodyParser = require('body-parser');
const router = require('./routes')
const mongoose  = require('mongoose');
mongoose.connect( process.env.MONGODB,{ useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
    console.log('Connection Successful');
}).catch((error)=>{     
    console.log('Something went wrong', error)
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/api',router);

app.listen(PORT, ()=>console.log(`Listening to ${PORT}`))