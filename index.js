const express = require('express')
const app = express()
require('express-async-errors')
const port = process.env.PORT || 3100
const path = require('path')
const morgan = require('morgan')
const {get} = require('http')
const mongoose = require('mongoose')
require('dotenv').config()
require('./db')

const userRoutes =require('./routes/userRoutes')
const todoRoutes =require('./routes/todoRoutes')

//middleware
app.use(express.json())
//app.use(express.urlencoded())
app.use(morgan('tiny'))
app.use(cors())


app.use('/users', userRoutes)
app.use('/todos', todoRoutes)

app.use((err, req, res, next)=>{
  console.log('error', err)
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || 'internal server error',
    errors: err?.errors || []
  })
})


//console.log("I am here")


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})