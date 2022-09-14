const mongoose = require('mongoose');
const isValid =function(value)
 {
    if (typeof (value) !== "string")return false;
    if (typeof (value) === "string"&& value.trim().length == 0)return false;
    if (typeof (value)==='undefined'||value==null)return false
    return true;
    }
    const isValidShortName=function(name){
        if(/^[a-z]{2,10}$/i.test(name)){
            return true
        }
    }

    const isValidFullName=function(fullname){
        if(/^[a-z ,&-]{2,200}$/i.test(fullname)){
            return true
        }
    }
    
    const isValidName=function(name){
        if(/^[a-z ]{2,50}$/i.test(name)){
            return true
        }
    }
    
    const isValidId = function (data) {
        return mongoose.Types.ObjectId.isValid(data);
      };
    
   
    const isValidEmail = function (mail) {
        if (/^[a-z0-9_]{3,}@[a-z]{3,}.[com]{3}$/.test(mail)) {
        return true;
        }
    }
    const isValidMobile=function(mobile){
        if(/[6789]{1}[0-9]{9}/.test(mobile)){
            return true
        }
    }
  
    
    
      module.exports={isValid,isValidEmail,isValidId,isValidMobile,isValidName,isValidShortName,isValidFullName}
