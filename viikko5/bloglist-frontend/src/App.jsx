import { useState, useEffect } from 'react'
import Blogs from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Message from './components/Message'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [blogs])

  useEffect(() => {
    const userLoggedIn = JSON.parse(window.localStorage.getItem('user'))
    setUser(userLoggedIn)
    blogService.setToken(userLoggedIn.token)
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

  return (
    <>
      {message && <Message message={ message } setMessage={setMessage } />}
      {!user && <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin}/>}
      {user  && <Blogs blogs={blogs} setBlogs={setBlogs} logout={logout} setMessage={setMessage} user={user}/>}
    </>
  )
}

export default App