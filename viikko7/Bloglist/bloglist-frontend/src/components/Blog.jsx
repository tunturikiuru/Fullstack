import blogService from '../services/blogs'
import Togglable from './Togglable'

const Blog = ({ blog, blogs, setBlogs, user, setMessage, onLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLike = async () => {
    const addedBy = blog.user
    const result = await blogService.updateLikes({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user[0]?.id,
    })
    result.user = addedBy
    const updatedBlogs = blogs.map((item) =>
      item.id === blog.id ? result : item
    )
    setBlogs(updatedBlogs)
  }

  const removeBlog = async () => {
    console.log(blog)
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      try {
        const result = await blogService.removeBlog({ id: blog.id })
        const updatedBlogs = blogs.filter((item) => item.id !== result.id)
        setBlogs(updatedBlogs)
      } catch (error) {
        setMessage(error)
      }
    }
  }

  /* just for tests :( */
  const handleLike = () => {
    if (onLike) {
      onLike()
    } else {
      addLike()
    }
  }

  /* 'added by unknown user' for few old database entries */
  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title} {blog.author}
        <Togglable buttonLabel="view">
          <div>{blog.url}</div>
          <div>
            likes: {blog.likes}{' '}
            <button onClick={() => handleLike()}>like</button>
          </div>
          <div>{blog.user[0]?.name || 'added by unknown user'}</div>
          <div>
            {user.username === blog.user[0]?.username && (
              <button onClick={() => removeBlog()}>remove</button>
            )}
          </div>
        </Togglable>
      </div>
    </div>
  )
}

export default Blog
