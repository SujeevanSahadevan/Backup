const express = require('express');
const mongoose = require('mongoose');
const cookieSession=require('cookie-session');
const passport=require('passport');
const bodyParser=require('body-parser');
const authRoutes = require('./routes/authRoutes');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
const billingRoutes = require('./routes/billingRoutes')


mongoose.connect(keys.mongoURI);


const app = express();

app.use(bodyParser.json());


app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys:[keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
billingRoutes(app);

if(process.env.NODE_ENV==='production'){
    app.use(express.static('clint/build'));
    //express will serve up production assets eg:main.css
    //will serve up index.html if express doesnt recognize the route

    const path =require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}


// app.get('/',
// (req,res)=>
// {
//     res.send({hi:'there buddy'});
// }
// ); //route handler



const PORT = process.env.PORT ||  5000;
app.listen(PORT);  


