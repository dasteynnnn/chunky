const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    uuid: {
        type:String,
        required:true
    },
    cid: {
        type:String,
        required:true
    },
    loanId: {
        type:String,
        required:true
    },
    amount: {
        type:Number,
        required:true
    },
    paymentOption: {
        type:String,
        required:true
    },
    refNumber: {
        type:String,
        required:true
    },
    createDate: {
        type:String,
        required:true
    },
    dateUpdated: String
})

const payment = mongoose.model('payment', schema);

module.exports = payment;