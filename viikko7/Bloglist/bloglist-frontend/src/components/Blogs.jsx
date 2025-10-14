import BlogForm from './BlogForm'
import Blog from './Blog'

const Blogs = ({ blogs, setBlogs, logout, user }) => {
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <BlogForm blogs={blogs} setBlogs={setBlogs} />
      <div>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            blogs={sortedBlogs}
            setBlogs={setBlogs}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default Blogs
