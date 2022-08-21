const express = require('express');
const router = express.Router();

const createAuthor= require("../controllers/authorController")
const createpublisher= require("../controllers/PublisherController")

const { createBook, getBooksWithAuthorDetails} = require("../controllers/bookController")

router.post("/createBook",createBook)
router.get("/getBooksWithAuthorDetails",getBooksWithAuthorDetails)

router.post("/createAuthor",createAuthor)
router.post("/createpublisher",createpublisher)

module.exports = router;
