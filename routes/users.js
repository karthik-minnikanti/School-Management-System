
const express = require('express')
const router = express.Router()
const UserModel = require('../models/Users')
require('mongoose')
const passport = require('passport')
const bcrypt = require('bcryptjs')
require('../config/passport')(passport)
const app = express()
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

 if(password.length<8)
 {
     errors.push({msg:"password should be at least 8 characters"})
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

            bcrypt.genSalt(10,(err,salt)=>
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err){
                        throw err
                    }
                    newUser.password = hash
                    newUser.save().then(user=>{
                        message = ["successfully registered please log in"]
                        // app.locals.success_msg="Success"
                        // req.flash()
                         res.locals.success_msg=req.flash("success_msg","successfuly registered please log in")
                        // res.redirect('/users/login')
                       // res.sendStatus(req.flash("message","successfuly registered"))
                        res.redirect('/users/login')
                        console.log(req.flash('success_msg'))
                        message=''
                        
                    })
                    .catch(err => console.log(err))
                    
            }))
           
            console.log(newUser)
            
         }
     })
 }

console.log(errors)

    
})


//login handle 
router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect: '/users/login',
        failureFlash:true,
    })(req,res,next)

})
module.exports= router