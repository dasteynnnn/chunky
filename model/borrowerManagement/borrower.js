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
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    middleName: String,
    address: String,
    idType: String,
    idNumber: Number,
    loanId: {
        type:String,
        required:true
    },
    createDate: {
        type:String,
        required:true
    },
    dateUpdated: String
})

const borrower = mongoose.model('borrower', schema);

module.exports = borrower;