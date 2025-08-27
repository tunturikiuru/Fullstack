const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minlength: [3, 'username min length 3'],
        required: true,
        unique: [true, 'username already in use']
    },
    name: String,
    passwordHash: {
        type: String,
        required: true
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)