import { useState, useEffect, useContext } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NotificationMessage from './components/NotificationMessage'
import NotificationContext from './NotificationContext'

const App = () => {
  const [user, setUser] = useState(null)
  const { notification } = useContext(NotificationContext)

  useEffect(() => {
    const userLoggedIn = JSON.parse(window.localStorage.getItem('user'))
    if (userLoggedIn) {
      setUser(userLoggedIn)
      blogService.setToken(userLoggedIn.token)
    }
  }, [])

  return (
    <>
      {notification && <NotificationMessage />}
      {!user && (<LoginForm setUser={setUser} /> )}
      {user && (<Blogs user={user} setUser={setUser}/> )}
    </>
  )
}

export default App
