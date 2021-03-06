const router = require('./index-router')

const routerUser = require('express').Router()
const ControllerUser = require('../controllers/controllerUser')

routerUser.get('/home', ControllerUser.fetchData)
routerUser.post('/register',ControllerUser.register)
routerUser.post('/login',ControllerUser.login)
routerUser.post('/googleLogin',ControllerUser.googleLogin)


module.exports = routerUser