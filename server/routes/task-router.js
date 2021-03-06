const routerTask = require('express').Router()
const {authorize} = require('../middlewares/auth')
const ControllerTask = require('../controllers/controllerTask')

routerTask.post('/tasks', ControllerTask.create)
routerTask.get('/tasks', ControllerTask.readAll)
routerTask.get('/tasks/:UserId', ControllerTask.readByUserId)
routerTask.get('/tasks/:id', ControllerTask.readById)
routerTask.patch('/tasks/:id', authorize, ControllerTask.modify)
routerTask.delete('/tasks/:id', authorize, ControllerTask.delete)

module.exports = routerTask