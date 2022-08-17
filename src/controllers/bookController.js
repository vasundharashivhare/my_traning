// const bookModel = require('../models/bookModel');

// const createBooks = async function (req, res) {
//   let data = req.body;
//   let savedData = await bookModel.create(data);
//   res.send({ msg: savedData });
// };
  // let allBooks= await BookModel.find( ).count() // COUNT

    // let allBooks= await BookModel.find( { authorName : "Chetan Bhagat" , isPublished: true  } ) // AND
    
    // let allBooks= await BookModel.find( { 
    //     $or: [ {authorName : "Chetan Bhagat" } , { isPublished: true } , {  "year": 1991 }]
    // } ).select( { bookName: 1, authorName: 1, _id: 0})n // SELECT keys that we want

    // let allBooks= await BookModel.find().sort( { sales: -1 }) // SORT

    // PAGINATION 
    // let page= req.query.page
    // let allBooks= await BookModel.find().skip(3 * (page-1)).limit(3)

    // let allBooks= await BookModel.find().sort({ sales: -1 }).skip(3 * (page-1)).limit(3).select({ bookName: 1, authorName: 1, _id: 0} )


    // let allBooks= await BookModel.find({ sales: { $eq:  137 }  }) 
    // let allBooks= await BookModel.find({ sales: { $ne:  137 }  }) 
    // let allBooks= await BookModel.find({ sales: { $gt:  50 }  }) 
    // let allBooks= await BookModel.find({ sales: { $lt:  50 }  }) 
    // let allBooks= await BookModel.find({ sales: { $lte:  50 }  }) 
    // let allBooks= await BookModel.find({ sales: { $gte:  50 }  }) 
    
    // let allBooks= await BookModel.find({     sales : { $in: [10, 17, 82] }     }).count() 
    // sales : { $in: [10, 17, 82] }
    
    // let allBooks= await BookModel.find({     sales : { $nin: [ 17, 82, 137] }     }).select({ sales: 1, _id:0})
    
    //  let allBooks= await BookModel.find({     $and: [{sales : {$gt: 20}} , [sales:  {$lt: 100}]]    })  //sales is between 20 and 100.... sales > 20 AND sales <100
    //  let allBooks= await BookModel.find({     sales : {$gt: 20, $lt: 100}   })  //sales is between 20 and 100.... sales > 20 AND sales <100


    //  let allBooks= await BookModel.findById("621c60a6b16c9e6bf2736e33") 
    //  let allBooks= await BookModel.findOne( {sales: 10}) 
    //  let allBooks= await BookModel.find( {sales: 10}) 
    
    

    // //  update (not covered: - findByIdAndUpdate | updateOne )
    // let allBooks= await BookModel.update(   
    //     {  sales: {$gt: 10}  }, //condition
    //     { $set: { isPublished: true} } // the change that you want to make
    //     ) 



    // REGEX
    // let allBooks= await BookModel.find( { bookName:  /^Int/  }) 
    // let allBooks= await BookModel.find( { bookName:  /^INT/i  }) 
    // let allBooks= await BookModel.find( { bookName:  /5$/  }) 
    // let allBooks= await BookModel.find( { bookName:  /.*Programming.*/i  }) 
    
    // ASYNC AWAIT
    























//const { count } = require("console")
const BookModel= require("../models/bookModel")

//1 creating  all books data
const createBook= async function (req, res) {
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}
const getAllBooks = async function (req, res) {
  let allUsers = await BookModel.find({});
  res.send({ msg: allUsers });
};

const booksData = async function (req, res) {
  let allBooks = await BookModel
    .find()
    .select({ bookName: 1, authorName: 1, _id: 0 });
  res.send({ msg: allBooks });
};

const getBooksInYear = async function (req, res) {
  let year = req.body.year;
  let allBooks1 = await BookModel.find({ year: year });
  res.send({ msg: allBooks1 });
};

const getparticularBOoks = async function (req, res) {
  let particularBooks = await BookModel.find(req.body);
  res.send({ msg: particularBooks });
};

const getXINRBooks = async function (req, res) {
  let indianBooks = await BookModel.find({ $in: ['100', '200', '500'] });

  res.send({ msg: indianBooks });
};

const getRandomBooks = async function (req, res) {
  let randomBooks = await BookModel.find({
    $or: [{ stockAvailable: true }, { totalpages: { $gt: 500 } }],
  });
  res.send({ msg: randomBooks });
};

module.exports.createBook = createBook
module.exports.getAllBooks = getAllBooks
module.exports.booksData = booksData
module.exports.getBooksInYear = getBooksInYear
module.exports.getparticularBOoks = getparticularBOoks
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks