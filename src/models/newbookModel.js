
const mongoose = require('mongoose');
const autherid = mongoose.Schema.Types.ObjectId
const publisherid = mongoose.Schema.Types.ObjectId
const newbookSchema = new mongoose.Schema( {
   
    name:String,
    author_id:
    {

       type: autherid,
       ref:"newAuthor",
       required:true
    },
    price:Number,
    ratings:Number,
    publisher_id:
    {  
        type:publisherid,
        ref:"newPublisher",
        required:true
    },
    ishardcover: {
       type: Boolean,
       default:false

    },
}, { timestamps: true });
module.exports = mongoose.model('LibraryBook', newbookSchema)
