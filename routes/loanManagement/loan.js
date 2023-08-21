var express = require('express')
var router = express.Router()

const controller = require('../../controller/loanManagement/loan')

//create new loan
router.post('/create', controller.create);

// //get loan
// router.get('/:loanId', controller.read);

// //update loan
// router.post('/update', controller.update);

// //delete loan
// router.delete('/delete/:loanId', controller.delete);

module.exports = router;