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

const ErrorMessage = ({ errorMessage }) => {
  const errorStyle = {
    color: 'red',
    fontSize: '30px',
    border: '3px solid red'

  }
  return (
  <div>
    <p style={errorStyle} >{ errorMessage }</p>
  </div>
)}


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
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
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
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
  }

  return (
    <>
      {errorMessage && <ErrorMessage errorMessage={ errorMessage } />}
      {!user && <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}/>}
      {user && <NewBlogForm createNewBlog={createNewBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}/>}
      {user  && <Blogs blogs={blogs} logout={logout} />}
    </>
  )
}

export default App