
const blogModel = require("../model/blogsModel")
const authorModel = require("../model/authorsModel")
const moment = require('moment')
const mongoose = require('mongoose');
const { query } = require("express")
const { isValidRequestBody } = require("../validator/validator")

//----------------------------Handler create A blog--------------------------//

const createBlog = async function (req, res) {
  try {
    let data = req.body;

    if (!isValidRequestBody(data)) return res.status(400).send({ status: false, message: "Body can't be empty it must contain some data." })

    if (!data.title || !data.authorId || !data.body || !data.category) {
      return res.status(400).send({ status: false, msg: "Body missing a mandatory field" })
    }
    if (!mongoose.isValidObjectId(data.authorId)) return res.status(400).send({ status: false, msg: "Type of BlogId is must be ObjectId " })
    let checkAuthor = await authorModel.findById(data.authorId);

    if (!checkAuthor) {
      res.status(401).send({ msg: "author id is invalid" });
    }
    let checkblog = await blogModel.findById(data.authorId);

    if (data.isPublished == true) {
      //created new attribute "publishedAt" in data 
      data["publishedAt"] = moment().format();;
    }
    if (data.isDeleted == true) {
      //created new attribute "deletedAt" in data 
      data["deletedAt"] = moment().format();;
    }

    let createData = await blogModel.create(data);
    res.status(201).send({ status: true, data: createData });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
};

//----------------------------Handler for fetch a blog--------------------------//
const getblog = async function (req, res) {
  try {
    if (Object.keys(req.query).length === 0) {

      let totalBlogs = await blogModel.find({ isDeleted: false, isPublished: true, });
      if (totalBlogs.length === 0) return res.status(404).send({ status: false, msg: "Blogs don't exist" });

      return res.status(200).send({ status: true, data: totalBlogs });
    }


    let { _id, title, authorId, category, tags, subcategory } = req.query;
    let query = {};
    if (_id != null) query._id = _id;
    if (title != null) query.title = title;
    if (authorId != null) query.authorId = authorId;
    if (category != null) query.category = category;
    if (tags != null) query.tags = tags;
    if (subcategory != null) query.subcategory = subcategory;
    query.isDeleted = false
    query.isPublished = true
    let finalFilter = await blogModel.find(query);
    if (finalFilter.length == 0) return res.status(404).send({ status: true, msg: "Request is Not found" })
    return res.status(200).send({ status: true, msg: finalFilter });

  } catch (error) {
    res.status(500).send({ status: false, msg: "server error" });
  }
};

//----------------------------Handler for Update blog--------------------------//
const updateBlog = async function (req, res) {
  try {
    let blogId = req.params.blogId
    if (!blogId) return res.status(400).send({ status: false, msg: "Blog id is mandatory" });

    if (!mongoose.isValidObjectId(blogId)) return res.status(400).send({ status: false, msg: "Type of BlogId must be ObjectId " })
    let foundDoc = await blogModel.findOne({ _id: blogId, isDeleted: false });
    if (!foundDoc) return res.status(404).send({ status: false, msg: "Blog is not found", });

    //-----------authorization start-----------//

    let userid = foundDoc["authorId"]
    let authorized_id = req.decodedToken["authorId"]
    if (userid != authorized_id) return res.status(403).send({ status: false, msg: "user is not authorized for this operation" })

    //------------------------authorization end------------//

    let data = req.body
    if (!isValidRequestBody(data)) return res.status(400).send({ status: false, message: "Body can't be empty it must contain some data." })
    let tags = data.tags;
    let category = data.category;
    let subcategory = data.subcategory;
    let title = data.title;
    let bodyData = data.body;
    foundDoc.tags = foundDoc.tags.concat(tags);

    foundDoc.subcategory = foundDoc.tags.concat(subcategory);
    let result1 = foundDoc.tags.filter((b) => b != null);
    let result2 = foundDoc.subcategory.filter((b) => b != null);


    if (foundDoc && foundDoc.isDeleted == false) {
      let updatedDoc = await blogModel.findOneAndUpdate(
        { _id: blogId },
        {
          tags: result1,
          category: category,
          subcategory: result2,
          title: title,
          bodyData: bodyData,
          $set: { isPublished: true, publishedAt: Date.now() },
        }, { new: true })
      return res.status(200).send({ status: true, msg: " Blog is succesfully Upadated" })
    }
  }
  catch (err) {
    res.status(500).send({ status: false, msg: err.message })
  }
}

//----------------------------Handler for Dlete blog--------------------------//


const deleteBlog = async function (req, res) {

  let blogId = req.params.blogId;
  if (!mongoose.isValidObjectId(blogId)) return res.status(400).send({ status: false, msg: "Type of BlogId is must be ObjectId " })
  let blogs = await blogModel.findById(blogId);
  if (!blogs) return res.status(404).send({ status: false, msg: "Blog is not found", });

  //-----------authorization start-----------//

  let userid = blogs["authorId"]
  let authorized_id = req.decodedToken["authorId"]
  if (userid != authorized_id) return res.status(403).send({ status: false, msg: "user is not authorized for this operation" })

  //------------------------authorization end------------//

  if (blogs.isDeleted == true) {
    return res.status(400).send({ status: false, msg: 'this blog  is already deleted.' })

  } else {
    let updatebloge = await blogModel.findOneAndUpdate({ _id: blogId }, { isDeleted: true }, { new: true });
    return res.send({ status: true, msg: "blog deleted successfully" });
  }
};

const deleteBlogByQuery = async function (req, res) {
  try {

    let data = req.query;
    if (Object.keys(data).length === 0) return res.status.send({ status: true, msg: "query params can't be empty==>>>choose what you want to delete" })

    let { _id, title, authorId, category, tags, subcategory } = req.query;
    
    let query = {};
    if (_id != null){ 
      if (!mongoose.isValidObjectId(_id)) return res.status(400).send({ status: false, msg: "Type of BlogId must be ObjectId " })
      query._id = _id;
    }
    if (title != null) query.title = title;
    if (authorId != null) query.authorId = authorId;
    if (category != null) query.category = category;
    if (tags != null) query.tags = tags;
    if (subcategory != null) query.subcategory = subcategory;
    let findData = await blogModel.findOne(query);
    if (!findData) return res.status(404).send({ status: false, msg: "Blog is not found", });

    //-----------authorization start-----------//

    let userid = findData["authorId"]
    let authorized_id = req.decodedToken["authorId"]
    if (userid != authorized_id) return res.status(403).send({ status: false, msg: "user is not authorized for this operation" })

    //------------------------authorization end------------//

    if (findData.isDeleted == true) return res.status(404).send({ status: false, msg: "blog is alrady deleted" });

    let deleteData = await blogModel.findOneAndUpdate(
      query,
      { $set: { isDeleted: true } },
      { new: true }
    );
    return res.status(200).send({ status: true, msg: "blog is deleted successfully" });
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

// const undeleteall=async function(req,res){
//   let undelete=await blogModel.updateMany({},{isDeleted:false},{new:true})
//   res.status(200).send({status:true,msg:"done he....:)>>:)>>:)"})
// }




module.exports.createBlog = createBlog
module.exports.getblog = getblog
module.exports.updateBlog = updateBlog
module.exports.deleteBlog = deleteBlog;
module.exports.deleteBlogByQuery = deleteBlogByQuery
//module.exports. undeleteall= undeleteall