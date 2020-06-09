const mongoose  = require('mongoose')

const AttendanceSchema = new mongoose.Schema({
    rollNumber:{
        type:String,
        required:true
    },
    Noofclasses:{
        type:Number,
        required:true
    },
    Attended:{
        type:Number,
        required:true
    },
    
    Date:{
        type:Number,
        default:Date.now
    }

})

const attedance = mongoose.model('attendance',AttendanceSchema)

module.exports = attedance