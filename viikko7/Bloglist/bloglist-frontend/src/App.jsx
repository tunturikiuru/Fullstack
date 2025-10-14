import { useState, useEffect, useContext } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NotificationMessage from './components/NotificationMessage'
import NotificationContext from './NotificationContext'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { notification, notificationDispatch } = useContext(NotificationContext)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [blogs])

  useEffect(() => {
    const userLoggedIn = JSON.parse(window.localStorage.getItem('user'))
    if (userLoggedIn) {
      setUser(userLoggedIn)
      blogService.setToken(userLoggedIn.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLoggingIn = await loginService.login({
        username,
        password,
      })
      setUser(userLoggingIn)
      blogService.setToken(userLoggingIn.token)
      window.localStorage.setItem('user', JSON.stringify(userLoggingIn))
      setUsername('')
      setPassword('')
      notificationDispatch({ type: 'SUCCESS', payload: { text: 'login successful', type: 'success' } })
    } catch {
      notificationDispatch({ type: 'ERROR', payload: { type: 'error', text: 'wrong credentials' }  })
    }
  }

  const logout = () => {
    window.localStorage.clear()
    setUser(null)
    blogService.setToken(null)
    notificationDispatch({ type: 'SUCCESS', payload: { type: 'success', text: 'logout succesfull' }  })
  }

  return (
    <>
      {notification && <NotificationMessage />}
      {!user && (
        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      )}
      {user && (
        <Blogs
          blogs={blogs}
          setBlogs={setBlogs}
          logout={logout}
          user={user}
        />
      )}
    </>
  )
}

export default App
