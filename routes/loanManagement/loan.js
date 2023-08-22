var express = require('express')
var router = express.Router()

const controller = require('../../controller/loanManagement/loan')

//get all loans
router.get('/', controller.get);

//create new loan
router.post('/create', controller.create);

//get specific loan
router.get('/:loanId', controller.read);

// //update loan
// router.post('/update', controller.update);

//delete loan
router.delete('/delete/:id', controller.delete);

//get loan paayments
router.get('/:loanId/payments', controller.payments);

module.exports = router;