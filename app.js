const express = require('express');

const connectDB = require('./config/database/connection');

//mongodb connection
connectDB()

const app = express();

//middleware
app.use(express.json());

const loanManagement = require('./routes/loanManagement/loan')
const paymentManagement = require('./routes/paymentManagement/payment')


app.use('/api/loan', loanManagement) //loan management
app.use('/api/payment', paymentManagement) //payment management

const PORT = process.env.port || 8000;
app.listen(PORT, () => {
    console.log(`listening to port : ${PORT}`)
});