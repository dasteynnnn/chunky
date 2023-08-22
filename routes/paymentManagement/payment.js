var express = require('express')
var router = express.Router()

const controller = require('../../controller/paymentManagement/payment')

//get all payments
router.get('/', controller.get);

//create new payment
router.post('/create', controller.create);

//get specific payment
router.get('/:paymentId', controller.read);


module.exports = router;