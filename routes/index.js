const express = require('express')
const router = express.Router()
const {ensureAuthenticate} = require('../config/auth')
router.get('/',(req,res)=>{
    res.render('welcome')
})
module.exports= router