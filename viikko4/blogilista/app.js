const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const { tokenExtractor, userExtractor } = require('./utils/middleware')

const app = express()

mongoose.connect(config.MONGODB_URI)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

app.use(express.json())
app.use(tokenExtractor)
app.use('/api/blogs', userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return res.status(400).json({ error: error.message })
    } else if (error.name === 'MongooseError') {
        return res.status(400).json({ error: error.message })
    }  else if (error.name ===  'JsonWebTokenError') {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  next(error)
}
app.use(errorHandler)

module.exports = app