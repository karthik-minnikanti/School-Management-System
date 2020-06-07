const express = require('express')
const mongoose = require('mongoose')
const app = express()
const expressLayouts = require('express-ejs-layouts')

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

//routes

app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))

//ejs

const PORT = process.env.PORT || 3000


app.listen(PORT,()=>{
    console.log('Server Started')
})