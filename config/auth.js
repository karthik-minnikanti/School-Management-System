const logincheck = require('connect-ensure-login')
module.exports = {
    ensureAuthenticate: function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }
        req.flash('error_msg','Please log in')
        res.redirect('/users/login')
    },
    ensure: function (){

        if(logincheck.ensureLoggedIn())
        {
            console.log('checking')
            return false
        }
        else{
            return false
        }


    }
}