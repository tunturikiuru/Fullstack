import { useState, useContext } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import NotificationContext from '../NotificationContext'
import UserContext from '../UserContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { notificationDispatch } = useContext(NotificationContext)
  const { userDispatch } = useContext(UserContext)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLoggingIn = await loginService.login({
        username,
        password,
      })
      userDispatch({ type: 'LOGIN', payload: userLoggingIn })
      blogService.setToken(userLoggingIn.token)
      window.localStorage.setItem('user', JSON.stringify(userLoggingIn))
      setUsername('')
      setPassword('')
      notificationDispatch({ type: 'SUCCESS', payload: { text: 'login successful', type: 'success' } })
    } catch {
      notificationDispatch({ type: 'ERROR', payload: { type: 'error', text: 'wrong credentials' }  })
    }
  }

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

export default LoginForm
