const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (req, res, next) => {
    let authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        authorization = authorization.replace('Bearer ', '')
        req.token = authorization
    } else {
        req.token = null
    }
    next()
}

const userExtractor = async (req, res, next) => {
    if (req.token) {
        const decodedToken= jwt.verify(req.token, process.env.SECRET)
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'token invalid' })
        }
        const user = await User.findById(decodedToken.id)
        if (!user) {
            return res.status(400).json({ error: 'userId missing or invalid'})
        }
        req.user = user
    }
    next()
}

module.exports = { tokenExtractor, userExtractor }