var uuid = require('uuidv4')
const date = new Date();

var loanDb = require('../../model/loanManagement/loan');
var paymentDb = require('../../model/paymentManagement/payment');

//create new loan
exports.create = (req,res) => {

    //validate request
    if(!req.body){
        return res
            .status(400)
            .send({
                code : 'F',
                description : 'Failed to process transaction',
                details : `Invalid Content`
            })
    }

    //new loan
    const loan = new loanDb({
        uuid: uuid.uuid(),
        cid: req.body.cid,
        amount: req.body.amount,
        tenureType: req.body.tenureType,
        tenure: req.body.tenure,
        interestType: req.body.interestType,
        interest: req.body.interest,
        paymentDay: date.getDay(),
        penaltyType: req.body.penaltyType,
        penalty: req.body.penalty,
        penaltyCount: 0,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        createDate: date,
        dateUpdated: date
    });

    //save loan to db
    loan
        .save(loan)
        .then(data => {
            res.send({
                code : 'S',
                description : 'Sucessfuly processed transaction'
            });
        })
        .catch(err => {
            return res
                .status(500)
                .send({
                    code : 'F',
                    description : 'Failed to process transaction',
                    details : err.message || 'DB Error'
                })
        })
}

//get all loans
exports.get = (req,res) => {
    loanDb.find()
        .then(loans=>{
            res.send({
                code : 'TS',
                description : 'Sucessfuly processed transaction',
                data : loans
            })
        })
        .catch(err=>{
            return res
                .status(500)
                .send({
                    code : 'F',
                    description : 'Failed to process transaction',
                    details : err.message || 'DB Error'
                })
        })
}

//get specific loan
exports.read = (req,res) => {
    const loanId = req.params.loanId;
    loanDb.aggregate([ { $match: { "uuid": loanId } } ])
        .then(loans=>{
            if(!loans.length){
                let message = `Loan doesn't exist`
                return res
                    .status(500)
                    .send({
                        code : 'F',
                        description : 'Failed to process transaction',
                        details : message
                    })
                
            }

            res.send({
                code : 'S',
                description : 'Sucessfuly processed transaction',
                data : loans
            })
        })
        .catch(err=>{
            return res
                .status(500)
                .send({
                    code : 'F',
                    description : 'Failed to process transaction',
                    details : err.message || 'DB Error'
                })
        })
}

//delete loan
exports.delete = (req,res) => {
    const id = req.params.id;
    loanDb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                return res
                    .status(404)
                    .send({
                        code : 'F',
                        description : 'Failed to process transaction',
                        details : `Cannot delete ${id}`
                    })
            } else {
                res.send({
                    code : 'S',
                    description : 'Sucessfuly processed transaction',
                    details : `Successfuly deleted ${id}`
                });
            }
        })
        .catch(err=>{
            return res
                .status(500)
                .send({
                    code : 'F',
                    description : 'Failed to process transaction',
                    details : err.message || 'DB Error'
                })
        })
}

//get loan payments
exports.payments = (req,res) => {
    const loanId = req.params.loanId;
    loanDb.aggregate([ { $match: { "uuid": loanId } } ])
        .then(loans=>{
            if(!loans.length){
                let message = `Loan doesn't exist`
                return res
                    .status(500)
                    .send({
                        code : 'F',
                        description : 'Failed to process transaction',
                        details : message
                    })
                
            }

            paymentDb.aggregate([ { $match: { "loanId": loanId } } ])
                .then(payments=>{
                    if(!payments.length){
                        let message = `Payment doesn't exist`
                        return res
                            .status(500)
                            .send({
                                code : 'F',
                                description : 'Failed to process transaction',
                                details : message
                            })
                        
                    }

                    const response = {
                        loan : loans[0].uuid,
                        payments : payments
                    }

                    res.send({
                        code : 'S',
                        description : 'Sucessfuly processed transaction',
                        details : response
                    })
                })
                .catch(err=>{
                    return res
                        .status(500)
                        .send({
                            code : 'F',
                            description : 'Failed to process transaction',
                            details : err.message || 'DB Error'
                        })
                })
        })
        .catch(err=>{
            return res
                .status(500)
                .send({
                    code : 'F',
                    description : 'Failed to process transaction',
                    details : err.message || 'DB Error'
                })
        })
}

