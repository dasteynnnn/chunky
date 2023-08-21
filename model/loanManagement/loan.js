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
    amount: {
        type:Number,
        required:true
    },
    tenureType: {
        type:String,
        required:true
    },
    tenure: {
        type:Number,
        required:true
    },
    interestType: {
        type:String,
        required:true
    },
    interest: {
        type:Number,
        required:true
    },
    paymentDay: {
        type:String,
        required:true
    },
    penaltyType: {
        type:String,
        required:true
    },
    penalty: {
        type:String,
        required:true
    },
    penaltyCount: {
        type:Number,
        required:true
    },
    startDate: {
        type:String,
        required:true
    },
    endDate: {
        type:String,
        required:true
    },
    createDate: {
        type:String,
        required:true
    },
    dateUpdated: String
})

const loan = mongoose.model('loan', schema);

module.exports = loan;