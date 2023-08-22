var uuid = require('uuidv4')
const date = new Date();

var paymentDb = require('../../model/paymentManagement/payment');
var loanDb = require('../../model/loanManagement/loan');

//create new payment
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

    //validate loan
    const loanId = req.body.loanId;
    loanDb.aggregate([ { $match: { "uuid": loanId } } ])
        .then(loans=>{
            if(!loans.length){
                let message = `Payment Failed. Loan doesn't exist`
                return res
                    .status(500)
                    .send({
                        code : 'F',
                        description : 'Failed to process transaction',
                        details : message
                    })
                
            }

            //new payment
            const payment = new paymentDb({
                uuid: uuid.uuid(),
                cid: req.body.cid,
                loanId: req.body.loanId,
                amount: req.body.amount,
                paymentOption: req.body.paymentOption,
                refNumber: req.body.refNumber,
                createDate: date,
                dateUpdated: date
            });
        
            //save paymnent to db
            payment
                .save(payment)
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

//get all payments
exports.get = (req,res) => {
    paymentDb.find()
        .then(payments=>{
            res.send({
                code : 'S',
                description : 'Sucessfuly processed transaction',
                data : payments
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

//get specific payment
exports.read = (req,res) => {
    const paymentId = req.params.paymentId;
    paymentDb.aggregate([ { $match: { "uuid": paymentId } } ])
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

            res.send({
                code : 'S',
                description : 'Sucessfuly processed transaction',
                data : payments
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

//delete live
exports.delete = (req,res) => {
    const id = req.params.id;
    paymentDb.findByIdAndDelete(id)
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

