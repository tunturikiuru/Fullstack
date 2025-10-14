import { useState } from 'react'
import blogService from '../services/blogs'

const NewBlogForm = ({ blogs, setBlogs, setMessage, mockHandler }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createNewBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.createNew({ title, author, url })
      const blogList = blogs.concat(newBlog)
      setBlogs(blogList)
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage({
        type: 'notification',
        text: `a new blog ${newBlog.title} by ${newBlog.author} added`,
      })
    } catch {
      setMessage({ type: 'error', text: 'virhe' })
    }
  }

  /* just for tests */
  const handleSubmit = (event) => {
    event.preventDefault()
    if (mockHandler) {
      mockHandler({ title, author, url })
    } else {
      console.log('handle submit')
      createNewBlog(event)
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default NewBlogForm
