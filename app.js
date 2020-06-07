const express = require('express')
const mongoose = require('mongoose')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const session = require('express-session')
//DB conf
const db = require('./config/keys').MongoURI
//connection

mongoose.connect(db,{useNewUrlParser:true, useUnifiedTopology: true }).then(()=>
{
    console.log("connected ")
}).catch((err)=>{
    console.log(err)
})

app.use(expressLayouts)
app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

//express session
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true
}))

//connect flash
app.use(flash())
//global variables

//routes

app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))
app.use((req,res,next)=>{
    req.locals.success_msg = req.flash('success_msg')
    req.locals.error_msg = req.flash('error_msg')
    console.log(req.locals.success_msg)
    next()

})

//ejs


const PORT = process.env.PORT || 3000


app.listen(PORT,()=>{
    console.log('Server Started')
})