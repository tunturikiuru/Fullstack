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


const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

export default Blogs