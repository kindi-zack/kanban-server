const { genSaltSync } = require('bcryptjs')
const jwt = require('jsonwebtoken')

function generateToken(payload){
    return jwt.sign(payload, process.env.SECRET)
}
// console.log(jwt.sign)
// console.log(generateToken('alkindi'))

module.exports = {generateToken}