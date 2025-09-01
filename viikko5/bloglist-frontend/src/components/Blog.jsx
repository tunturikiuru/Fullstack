import { useState } from 'react'
import BlogForm from "./NewBlogForm"

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
        {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
      </div>
    </div>
)}


const Blog = ({ blog }) => {
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

  blog.added = blog.user[0] ? blog.user[0].name : 'added by unknown user'

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
          likes: {blog.likes} <button>like - not yet working</button>
        </div>
        <div>
          {blog.added} 
        </div>
      </div>
    </div>
  )
}

export default Blogs