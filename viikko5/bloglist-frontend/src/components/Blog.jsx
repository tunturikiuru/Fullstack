import { useState } from 'react'
import BlogForm from "./NewBlogForm"
import blogService from '../services/blogs'


const Blogs = ({blogs, setBlogs, logout, setMessage}) => {
  return (
  <div>
      <h2>blogs</h2>
      <div> 
        {JSON.parse(window.localStorage.getItem('user')).name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <BlogForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage}/>
      <div>
        {blogs.map(blog => <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />)}
      </div>
    </div>
)}


const Blog = ({ blog, blogs, setBlogs }) => {
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
      </div>
    </div>
  )
}

export default Blogs