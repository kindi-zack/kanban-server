const {Task, User} = require('../models')

class ControllerTask{
    static create(req, res, next){
        const {title, description, category} = req.body

        Task.create({
            title,
            description,
            category,
            UserId: req.decoded.id
        })
        .then(task=>{
            res.status(201).json(task)
        })
        .catch(err=>{
            next(err)
        })
    }

    static readAll(req, res, next){
        Task.findAll({
            // order: [['id', 'DESC']]
            where: {
                UserId : req.decoded.id
            },
            include: [User]
        })
        .then(task=>{
            res.status(200).json(task)
        })
        .catch(err=>{
            next(err)
        })
    }

    static readByUserId(req, res, next){
        Task.findAll({
            where: {
                UserId : req.params.UserId
            }
        })
        .then(task=>{
            if(task.length===0) throw err
            res.status(200).json(task)
        })
        .catch(err=>{
            err = {msg: 'Task is Unavailable'}
            next(err)
        })
    }

    static modify(req, res, next){
        const id = +req.params.id
        const {title, description, category} = req.body

        Task.update({
            title, description, category
        },{
            where :{
                id
            },
            returning: true
        })
        .then(task=>{
            res.status(200).json(task)
        })
        .catch(err=>{
            next(err)
        })

    }

    static readById(req, res, next){
        const id = +req.params.id

        Task.findByPk(id)
        .then(task=>{
            res.status(200).json(task)
        })
        .catch(err=>{
            next(err)
        })

    }

    static delete(req, res, next){

        Task.destroy({
            where:{
                id: req.params.id
            }
        })
        .then(_=>{
            res.status(200).json({
                msg: 'Delete Successfully'
            })
        })
        .catch(err=>{
            next(err)
        })
    }
}

module.exports = ControllerTask