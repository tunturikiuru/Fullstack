const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    const passwordHash = await bcrypt.hash('secretpasssword', 10)
    const user = new User({username: 'Aku', name: 'Aku Ankka', passwordHash })
    await user.save()
})

describe('users', () => {
    test('new user can be created', async () => {
        const user = {username: 'qwerty', name: 'Mikko Mallikas', password: 'qwertyuiop'}
        const usersAtStart = await helper.usersInDB()
        await api
            .post('/api/users')
            .send(user)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const usersAtEnd = await helper.usersInDB()

        assert.strictEqual(usersAtStart.length, usersAtEnd.length-1)
        const names = usersAtEnd.map(user => user.name)
        assert(names.includes(user.name))
    })

    test('user with short name cannot be created', async () => {
        const user = {username: 'hu', name: 'Hupu Ankka', password: 'asdfgh'} 
        const usersAtStart = await helper.usersInDB()
        await api
            .post('/api/users')
            .send(user)
            .expect(400)
        const usersAtEnd = await helper.usersInDB()

        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
        const names = usersAtEnd.map(user => user.name)
        assert(!names.includes(user.name))

    })

    test('user with too short password cannot be created', async () => {
        const user = {username: 'mikki', name: 'Mikki Hiiri', password: 'mh'} 
        const usersAtStart = await helper.usersInDB()
        await api
            .post('/api/users')
            .send(user)
            .expect(400)
        const usersAtEnd = await helper.usersInDB()

        assert.strictEqual(usersAtStart.length, usersAtEnd.length)
        const names = usersAtEnd.map(user => user.name)
        assert(!names.includes(user.name))
    })

    test('username must be unique', async () => {
        const user = {username: 'lupu', name: 'Lupu Ankka', password: 'salasana'} 
        const usersAtStart = await helper.usersInDB()
        await api
            .post('/api/users')
            .send(user)
            .expect(201)

        const usersAtMiddle = await helper.usersInDB()
        assert.strictEqual(usersAtStart.length, usersAtMiddle.length-1)
        const names = usersAtMiddle.map(user => user.name)
        assert(names.includes(user.name))

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
        const usersAtEnd = await helper.usersInDB()

        assert.strictEqual(usersAtMiddle.length, usersAtEnd.length)
    })
})

after(async () => {
    await mongoose.connection.close()
})




