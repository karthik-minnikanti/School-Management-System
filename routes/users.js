
const express = require('express')
const router = express.Router()
const UserModel = require('../models/Users')
require('mongoose')
const bcrypt = require('bcryptjs')
//loginpage
router.get('/login',(req,res)=>{
    res.render('login')
})
//registerpage
router.get('/register',(req,res)=>{
    res.render('register')
})
//register handle
router.post('/register',(req,res)=>{
    const {name,email,password,password2} = req.body
    let errors = []
//check requirng
if(!name|| !email || !password || !password2)
{
    errors.push({msg:"please fill all fields"})
}
 if(password2 !== password)
 {
     errors.push({msg:"passwords do not match"})
 }

 if(password.length<6)
 {
     errors.push({msg:"password should be at least 6 characters"})
 }
 if(errors.length>0)
 {
     res.render('register',{errors,name,email,password,password2})
 }
 else{
     UserModel.findOne({email}).then((user)=>{
         if(user) {
             console.log('this is working')
                // user exists
                errors.push({msg:"Email is already registered"})
                res.render('register',{errors,name,email,password,password2})
                
         }
        else {
            const newUser = new UserModel({
                name,email,password,
            })
            newUser.save()
            console.log(newUser)
            res.send('hello')
         }
     })
 }

console.log(errors)

    
})
module.exports= router