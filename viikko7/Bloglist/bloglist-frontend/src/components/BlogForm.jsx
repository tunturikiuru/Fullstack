import { useState } from 'react'
import NewBlogForm from './NewBlogForm'

const BlogForm = ({ blogs, setBlogs }) => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFormVisible(true)}>
          create new blog
        </button>
      </div>
      <div style={showWhenVisible}>
        <NewBlogForm
          blogs={blogs}
          setBlogs={setBlogs}
        />
        <button onClick={() => setBlogFormVisible(false)}>cancel</button>
      </div>
    </>
  )
}

export default BlogForm
