const jwt = require('jsonwebtoken')
const {User, Task} = require('../models')

function authenticate(req, res, next){
    try{
        const token = req.headers.token
        const decoded = jwt.verify(token, process.env.SECRET);
        const user = User.findOne({where:{email: decoded.email}})
        if(!user) throw {msg : 'Not authorize'}
        req.decoded = decoded
        
        // console.log(decoded)
        next()

    }catch(err){
        err.message = 'You Must Login First'
        next(err)
    }
}

function authorize(req, res, next){
    Task.findByPk(req.params.id)
    .then(task=>{
        console.log(req.decoded.id,'||',task.UserId)
        if(req.decoded.id === task.UserId) {
            next()
        }else{
            throw err = {message: 'Not Authorize'}
        }
    })
    .catch(err=>{
        next(err)
    })
}

module.exports = {authenticate, authorize}