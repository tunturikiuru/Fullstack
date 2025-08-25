const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

usersRouter.post('/', async (req, res, next) => {
    const { username, name, password } = req.body

    if (password.length < 3) {
        return res.status(400).send({error: 'password min length 3'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({ username, name, passwordHash })

    try {
        const savedUser = await user.save()
        return res.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }
})


module.exports = usersRouter