import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const Blogs = ({blogs, logout}) => {
  return (
  <div>
      <h2>blogs</h2>
      <p> 
        {JSON.parse(window.localStorage.getItem('user')).name} logged in
        <button onClick={logout}>logout</button>
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
)}

const LoginForm = ({username, setUsername, password, setPassword, handleLogin}) => {
  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input type='text' value={username} onChange={({ target }) => setUsername(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            password
            <input type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
          </label> 
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )
}

const NewBlogForm = ({ createNewBlog, title, setTitle, author, setAuthor, url, setUrl }) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNewBlog}>
        <div>
          <label>
            title
            <input type='text' value={title} onChange={({ target }) => setTitle(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            author
            <input type='text' value={author} onChange={({ target }) => setAuthor(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            url
            <input type='text' value={url} onChange={({ target }) => setUrl(target.value)}/>
          </label>
        </div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

const Message = ({ message, setMessage }) => {
  if (!message) {
    return null
  }
  const messageStyle = {
    color: message.type === 'error' ? 'red' : 'green',
    fontSize: '30px',
    border: message.type === 'error' ? '3px solid red' : '3px solid green'
  }
  setTimeout(() => {
    setMessage(null)
  }, 5000)

  return (
  <div>
    <p style={messageStyle} >{ message.text }</p>
  </div>
)}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userLoggedIn = JSON.parse(window.localStorage.getItem('user'))
    setUser(userLoggedIn)
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const userLoggingIn = await loginService.login({ username, password })
      setUser(userLoggingIn)
      blogService.setToken(userLoggingIn.token)
      window.localStorage.setItem('user', JSON.stringify(userLoggingIn))
      setUsername('')
      setPassword('')
      setMessage({ type: 'notification', text: 'login succesfull' })
    } catch {
      setMessage({ type: 'error', text: 'wrong credentials' })
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
    setMessage({ type: 'notification', text: 'logout succesfull' })
  }

  const createNewBlog = async (event) => {
    event.preventDefault()
    console.log('täällä')
    const newBlog = await blogService.createNew({ title, author, url })
    console.log(newBlog)
    const blogList = blogs.concat(newBlog)
    setBlogs(blogList)
    setTitle('')
    setAuthor('')
    setUrl('')
    setMessage({ type: 'notification', text: `a new blog ${newBlog.title} by ${newBlog.author} added` })
  }

  return (
    <>
      {message && <Message message={ message } setMessage={setMessage } />}
      {!user && <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}/>}
      {user && <NewBlogForm createNewBlog={createNewBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}/>}
      {user  && <Blogs blogs={blogs} logout={logout} />}
    </>
  )
}

export default App