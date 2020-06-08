const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = require('../models/Users')

module.exports = function(passport){
new localStrategy({usernameField:'email'},(email,password,done)=>{
    //match user
    User.findOne({email:email})
    .then(user =>{
        if(!user) return done(null,false,{message:'email is not registered'})

        bcrypt.compare(password,user.password,(err,isMatch)=>{
            if(err) throw err
            if(isMatch) 
            return done(null,user)
            else
            return done(null,false,{message:"password is incorrect"})

        })
    })

    .catch()
})

}