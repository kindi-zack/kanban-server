const {User} = require('../models')
const {comparePass} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const { OAuth2Client } = require("google-auth-library");
// const { TokenExpiredError } = require('jsonwebtoken');

class ControllerUser{
    static fetchData(req, res, next){
        User.findAll()
        .then(user=>{
            res.status(200).json(user)
        })
        .catch(next)
    }

    static register(req, res, next){
        const {username, email, password} = req.body
        User.create({
            username,
            email,
            password
        })
        .then(data=>{
            res.status(201).json({
                msg: `${data.username} Has Successfully Registered!!`
            })
        })
        .catch(err=>{
            next(err)
        })
    }

    static login(req, res, next){
        const {email, password} = req.body

        User.findOne({
            where: {
                email
            }
        })
        .then(user=>{
            if(!user) throw {msg: 'Invalid Email/Password'}

            const checkPass = comparePass(password, user.password)

            if(!checkPass) throw {msg: 'Invalid Email/Password'}

            const access_token = generateToken({
                id: user.id,
                email: user.email,
                username: user.username,
            })

            res.status(200).json({access_token, username: user.username})
        })
        .catch(err=>{
            // console.log(err)
            next(err)
        })

    }

    static googleLogin(req, res, next) {
      console.log('>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<')
      const client = new OAuth2Client(process.env.CLIENT_ID);
      let email = ''
      let password = ''
      client  
          .verifyIdToken({
              idToken: req.body.id_token,
              audience: process.env.CLIENT_id
          })
          .then((ticket)=>{
              const payload = ticket.getPayload();
              // console.log(payload)
              email = payload.email
              return User.findOne({where: {email}})
          })
          .then(user=>{
              if(user){
                  const token = generateToken({
                      id: user.id,
                      email: user.email
                  })
                  res.status(201).json({access_token: token })
              }else{
                  return User.create({
                      email,
                      password: 'whatever'
                  })
              }
          })
          .then(registerUser=>{
              const token = generateToken({
                  id: registerUser.id,
                  email: registerUser.email
              })
              res.status(201).json({access_token: token })
          })
          .catch(err=>{
              console.log(err)
          })
          
        }
    
    
}


module.exports = ControllerUser