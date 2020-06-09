const express = require('express')
const router = express.Router()
const {ensureAuthenticate,ensure} = require('../config/auth')
router.get('/',(req,res)=>{
    if(ensure())
        {
            res.render('dashboard',{
                name: req.user.rollnumber
            })
        }
        else{
            res.render('welcome')
        }
    
})
module.exports= router