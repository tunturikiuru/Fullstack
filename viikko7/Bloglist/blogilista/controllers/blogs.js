const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1,
        id: 1,
    })
    response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const blog = new Blog(request.body)
    const user = request.user

    if (!user) {
        return response.status(400).json({ error: 'userId missing or invalid' })
    }
    if (!blog.title || !blog.url) {
        return response.status(400).json({ error: 'title or url missing' })
    }
    if (!blog.likes) {
        blog.likes = 0
    }

    blog.user = user._id
    user.blogs = user.blogs.concat(blog._id)
    const result = await blog.save()
    await user.save()

    response.status(201).json(result)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const user = request.user
    if (!user) {
        return response.status(400).json({ error: 'userId missing or invalid' })
    }

    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === user.id.toString()) {
        await Blog.findByIdAndDelete(request.params.id)
        await user.updateOne({ $pull: { blogs: request.params.id } })
        return response.status(204).end()
    }
    return response
        .status(400)
        .json({ error: 'not authorized to delete this blog' })
})

blogsRouter.patch('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog) {
        return response.status(400).end()
    }
    if (request.body.likeChange) {
        blog.likes += 1
        const result = await blog.save()
        response.json(result)
    }
    response.status(400).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes, user } = request.body

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(404).end()
    }

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const updatedBlog = await blog.save()

    response.json(updatedBlog)
})

module.exports = blogsRouter
