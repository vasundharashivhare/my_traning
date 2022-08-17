// const mongoose = require('mongoose');

// const bookSchema = new mongoose.Schema(
//   {
//     bookName: {
//       type: String,
//       required: true,
//     },
//     authorName: String,
//     tags: [String],

//     prices: {
//       indianPrice: Number,
//       europePrice: Number,
//     },
//     year: {
//       type: Number,
//       default: 2021,
//     },
//     totalPages: Number,
//     stockAvailable: Boolean,
//   },

//   { timestamps: true }
// );

// module.exports = mongoose.model('Book', bookSchema); //users


const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema( {
    bookName: {
        type : String,
        required : true
    }, 
    authorName : String,
    year: {
        type: Number,
        default: 2021
    },
    tags: [String],      
    price: {
        indianPrice: Number,
        europeanPrice: Number,
    },
    totalPages : Number,
    stockAvailable : Boolean,
}, { timestamps: true });


module.exports = mongoose.model('Books', bookSchema) //users
