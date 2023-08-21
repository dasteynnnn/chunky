var uuid = require('uuidv4')
const date = new Date();

var loanDb = require('../../model/loanManagement/loan');

//create new live
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

