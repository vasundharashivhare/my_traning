const mongoose = require('mongoose');


const userSchema = new mongoose.Schema( {
    name: String,
    balance: {
       type: Number,
       default:100
    },

    address:String,
    age:Number,
    isFreeAppUser:Boolean,
    gender: {
        type: String,
        enum: ["male", "female", "others"] 
    }
    
   
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema) 



