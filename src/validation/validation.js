const mongoose = require('mongoose');
const isValid =function(value)
 {
    if (typeof (value) !== "string")return false;
    if (typeof (value) === "string"&& value.trim().length == 0)return false;
    if (typeof (value)==='undefined'||value==null)return false
    return true;
    }

    const isValidRequestBody = (value) => {
        return Object.keys(value).length > 0
    }


    const isValidShortName=function(name){
        if(/^[a-z]{2,10}$/i.test(name)){
            return true
        }
    }

    const isValidFullName=function(fullname){
        if(/^[a-zA-Z]+$/i.test(fullname)){
            return true
        }
    }
    
    const isValidName=function(name){
        if(/^[a-zA-Z ]*$/i.test(name)){
            return true
        }
    }
    
    const isValidId = function (data) {
        return mongoose.Types.ObjectId.isValid(data);
      };
    
   
    const isValidEmail = function (mail) {
        if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail)) {
        return true;
        }
    }
    const isValidMobile=function(mobile){
        if(/[6789]{1}[0-9]{9}/.test(mobile)){
            return true
        }
    }
    const isValidLink=function(link){
        if(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.#?&//=]*)/i.test(link)){
            return true
        }
    }
  
    
    
      module.exports={isValid,isValidEmail,isValidId,isValidMobile,isValidName,isValidShortName,isValidFullName,isValidLink,isValidRequestBody}