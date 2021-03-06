// if (process.env.NODE_ENV === 'development'){
    require('dotenv').config()
// }
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const router = require('./routes/index-router')
const errorHandler = require('./middlewares/errorHandlers')
const cors = require('cors')

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.use(router)

app.use(errorHandler)

app.listen(port, ()=> console.log(`kanban app running on port ${port}`))
