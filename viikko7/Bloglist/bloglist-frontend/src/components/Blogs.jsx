import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const Blogs = ({ sortedBlogs }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <BlogForm />
      <div>
        {sortedBlogs.map(blog =>
          <div style={blogStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blogs
