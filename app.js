const express = require('express');

const connectDB = require('./config/database/connection');

//mongodb connection
connectDB()

const app = express();

//middleware
app.use(express.json());

const loanManagement = require('./routes/loanManagement/loan')

//loan management
app.use('/api/loan', loanManagement)

const PORT = process.env.port || 8080;
app.listen(PORT, () => {
    console.log(`listening to port : ${PORT}`)
});