const router = require('./Routes/router')

// const appMiddleware = require('./middleWares/appMiddleWare')
//import dotenv
require('dotenv').config()
//import express
const express = require('express')
//import connection.js
require('./DB/connections')

//import cors
const cors = require('cors')

//create server
const pfServer = express()

//include cors into the server
pfServer.use(cors())

//use of amiddleware,to convert json to js object
pfServer.use(express.json())

// pfServer.use(appMiddleware)

pfServer.use(router)

//pfserver should expose the path uploads
pfServer.use('/uploads', express.static('./uploads'))

//define port
const port = 4000

pfServer.get('/', (req, res) => {
    res.send('Project fair is running successfully')
})
//run the port
pfServer.listen(port, () => {
    console.log(`server is successfully at : ${port}`);
})
