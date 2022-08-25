const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema( {
    "amount": Number,
	"isFreeAppUser": Boolean, 
	"date": Number


}, { timestamps: true });

module.exports = mongoose.model('Product', orderSchema)
