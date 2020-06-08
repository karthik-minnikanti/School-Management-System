const express = require('express')
const mongoose = require('mongoose')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const flash = require('express-flash')
const session = require('express-session')
//DB conf
const db = require('./config/keys').MongoURI
//connection
const passport = require('passport') 
var cookieParser = require('cookie-parser');
require('./config/passport')(passport)

const path = require('path')
const js = path.join(__dirname,'/public/password')
app.use(express.static(js))
mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology: true }).then(()=>
{
    console.log("connected ")
}).catch((err)=>{
    console.log(err)
})

app.use(flash())
app.use(expressLayouts)
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

//express session
app.use(cookieParser());
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true
}))
app.use(passport.initialize());

app.use(passport.session());




//connect flash

//global variables

//routes
console.log(__dirname)
console.log(js)
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))

//ejs
app.use((req, res, next) => {req.user = req.session.user; next()})
const PORT = process.env.PORT || 3000

app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()

})
app.listen(PORT,()=>{
    console.log('Server Started')
})