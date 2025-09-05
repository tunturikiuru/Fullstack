import { useState } from 'react'
import BlogForm from "./NewBlogForm"
import blogService from '../services/blogs'


const Blogs = ({blogs, setBlogs, logout, setMessage, user}) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  
  return (
  <div>
      <h2>blogs</h2>
      <div> 
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <BlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage}/>
      <div>
        {sortedBlogs.map(blog => <Blog key={blog.id} blog={blog} blogs={sortedBlogs} setBlogs={setBlogs} user={user} setMessage={setMessage}/>)}
      </div>
    </div>
)}


const Blog = ({ blog, blogs, setBlogs, user, setMessage }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const hideWhenVisible = {display: blogVisible ? 'none' : ''}
  const showWhenVisible = {display: blogVisible ? '': 'none'}
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = async () => {
    const addedBy =  blog.user
    const result = await blogService.updateLikes({ id: blog.id, title: blog.title, author: blog.author, url: blog.url, likes: blog.likes + 1, user: blog.user[0]?.id })
    result.user = addedBy
    const updatedBlogs = blogs.map(item => item.id===blog.id ? result : item)
    setBlogs(updatedBlogs)
  }

  const removeBlog = async () => {
    if (window.confirm(`Remove ${blog.name} by ${blog.author}`)) {
      try {
      const result = await blogService.removeBlog({ id: blog.id })
      const updatedBlogs = blogs.filter(item => item.id !== result.id)
      setBlogs(updatedBlogs)
      } catch (error) {
        setMessage(error)
      }
    }
  }

  /* 'added by unknown user' for few old database entries */ 
  return(
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setBlogVisible(true)}>view</button>
      </div> 
      <div style={showWhenVisible}>
        <div>
          {blog.title} {blog.author} <button onClick={() => setBlogVisible(false)}>hide</button>
        </div>
        <div>
          {blog.url} 
        </div>
        <div>
          likes: {blog.likes} <button onClick={() => addLike()}>like</button>
        </div>
        <div>
          { blog.user[0]?.name || 'added by unknown user' } 
        </div>
        <div>
          { user.username === blog.user[0]?.username && <button onClick={ () => removeBlog() }>remove</button> }
        </div>
      </div>
    </div>
  )
}

export default Blogs