const isvalidISBN=function(isbn){
    return /^(97[8|9]-)(\d{10,13}+)/.test(isbn)
}

module.exports={isvalidISBN}