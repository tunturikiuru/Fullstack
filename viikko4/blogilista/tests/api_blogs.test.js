const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper.js')

const api = supertest(app)

const blogs = helper.initialBlogs


beforeEach(async () => {
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
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, 6)
    })

    test("blog id is called 'id'", async () => {
        const response = await api.get('/api/blogs')
        assert.match(response.body[0].id, /^[a-z0-9]{24}$/)
    })
})

describe('10 & 11 & 12: POST /api/blogs',  () => {
    const newBlog = {title: "New Blog", author: "Someone", url: "www.....", likes: ""} 
    
    test('new blog can be added and found', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const result = await api.get('/api/blogs')
        assert.strictEqual(result.body.length, 7)
        assert.deepStrictEqual(result.body[result.body.length-1].title, newBlog.title)
    })

    test('blog without like amount has 0 likes', async () => {
        await api.post('/api/blogs').send(newBlog)
        const result = await api.get('/api/blogs')
        assert.strictEqual(result.body[result.body.length-1].likes, 0)
    })
    
    test('blog without title get response 400 and blog is not saved', async () => {
        const invalidBlog = {title: "", author: "Someone", url: "www.....", likes: "1"} 
        await api
            .post('/api/blogs')
            .send(invalidBlog)
            .expect(400)
        const result = await api.get('/api/blogs')
        assert.strictEqual(result.body.length, 6)
    })

    test('blog without url get response 400 and blog is not saved', async () => {
        const invalidBlog = {title: "Next Blog", author: "Someone", url: "", likes: "3"} 
        await api
            .post('/api/blogs')
            .send(invalidBlog)
            .expect(400)
        const result = await api.get('/api/blogs')
        assert.strictEqual(result.body.length, 6)
    })
})

after(async () => {
    await mongoose.connection.close()
})