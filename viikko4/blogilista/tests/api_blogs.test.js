const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper.js')

const api = supertest(app)

const blogs = helper.initialBlogs


beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('8 & 9: GET /api/blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const result = await api.get('/api/blogs')
        assert.strictEqual(result.body.length, 6)
    })

    test("blog id is called 'id'", async () => {
        const result = await api.get('/api/blogs')
        assert.match(result.body[0].id, /^[a-z0-9]{24}$/)
    })
})

describe('10 & 11 & 12 & 23: POST /api/blogs',  () => {
    let token
    let username

    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('onnenlantti', 10)
        username = 'roope'
        const newUser = new User({ username: username, name: 'R. Ankka', passwordHash })
        await newUser.save()
        const user = { username: username, password: 'onnenlantti'}
        const result = await api.post('/api/login').send(user)
        token = result.body.token 
    })
    
    test('new blog can be added and found', async () => {
        const newBlog = {title: "raha", author: "maailman rikkain ankka", url: "www.....", likes: 2} 
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const result = await helper.blogsInDB()
        assert.strictEqual(result.length, 7)
        assert.deepStrictEqual(result[result.length-1].title, newBlog.title)
    })

    test('blog without like amount has 0 likes', async () => {
        const newBlog = {title: "New Blog", author: "Someone", url: "www.....", likes: ""} 
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
        const result = await helper.blogsInDB()
        assert.strictEqual(result[result.length-1].likes, 0)
    })
    
    test('blog without title get response 400 and blog is not saved', async () => {
        const invalidBlog = {title: "", author: "Someone", url: "www.....", likes: "1"} 
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidBlog)
            .expect(400)
        const result = await helper.blogsInDB()
        assert.strictEqual(result.length, 6)
    })

    test('blog without url get response 400 and blog is not saved', async () => {
        const invalidBlog = {title: "Next Blog", author: "Someone", url: "", likes: "3"} 
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(invalidBlog)
            .expect(400)
        const result = await helper.blogsInDB()
        assert.strictEqual(result.length, 6)
    })

    test('blog cannot added without right authorization', async () => {
        const blogsAtStart = await helper.blogsInDB()
        const newBlog = {title: "raha", author: "maailman rikkain ankka", url: "www.....", likes: 2}
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer qwertyuio`)
            .send(newBlog)
            .expect(401)
        const blogsAtEnd = await helper.blogsInDB()
        assert.strictEqual(blogsAtStart.length, blogsAtEnd.length)
    })


    describe('13 & 14 & 23: DELETE and PATCH /api/blogs', () => {
        let blogId

        beforeEach(async () => {
            const newBlog = {title: "lisää rahaa", author: "maailman rikkain ankka", url: "www.....", likes: 2} 
            const result = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog)
            blogId = result.body.id
        })

        test('blog can be removed', async () => {
            const blogsAtStart = await helper.blogsInDB()
            await api.delete(`/api/blogs/${blogId}`).set('Authorization', `Bearer ${token}`).expect(204)
            const blogsAtEnd = await helper.blogsInDB()

            titles = blogsAtEnd.map(blog => blog.title)
            assert(!titles.includes('lisää rahaa'))
            assert.strictEqual(blogsAtStart.length, blogsAtEnd.length+1)
        })

        test('likes can be changed', async () => {
            const blogsAtStart = await helper.blogsInDB()
            const blogToBeChanged = blogsAtStart[0]
            await api
                .patch(`/api/blogs/${blogToBeChanged.id}`)
                .send({ likeChange: 1 })
                .expect(200)
            const blogsAtEnd = await helper.blogsInDB()
            assert.strictEqual(blogToBeChanged.likes + 1, blogsAtEnd[0].likes)
        })
    })
})


after(async () => {
    await mongoose.connection.close()
})