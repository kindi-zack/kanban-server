const router = require('express').Router()
const routerUser = require('./user-router')
const routerTask = require('./task-router')
const {authenticate} = require('../middlewares/auth')

router.use(routerUser)
router.use(authenticate)
router.use(routerTask)

module.exports = router