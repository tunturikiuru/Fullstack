import { useEffect, useContext } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NotificationMessage from './components/NotificationMessage'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'

const App = () => {
  const { notification } = useContext(NotificationContext)
  const { user, userDispatch } = useContext(UserContext)

  useEffect(() => {
    const userLoggedIn = JSON.parse(window.localStorage.getItem('user'))
    if (userLoggedIn) {
      userDispatch({ type: 'LOGIN', payload: userLoggedIn })
      blogService.setToken(userLoggedIn.token)
    }
  }, [])

  return (
    <>
      {notification && <NotificationMessage />}
      {!user && (<LoginForm /> )}
      {user && (<Blogs /> )}
    </>
  )
}

export default App
