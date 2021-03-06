function errorHandler(err, req, res, next){
    // console.log(err.name)
    switch(err.name){
        case 'SequelizeValidationError':
            var msgErrors = err.errors
            msgErrors = msgErrors.map(el=>{
                return el.message
            })
            res.status(400).json(msgErrors)
        break;
        
        case 'SequelizeUniqueConstraintError':
            var msgErrors = err.errors
            msgErrors = msgErrors.map(el=>{
                return el.message
            })
            res.status(400).json(msgErrors)
        break;

        case 'JsonWebTokenError':
            res.status(400).json(err.message)
        break

        default:
            console.log(err)
            res.status(400).json(err)
    }
}

module.exports = errorHandler