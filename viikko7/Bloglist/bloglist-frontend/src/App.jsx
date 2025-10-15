import { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import User from './components/User'
import Users from './components/Users'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import NotificationMessage from './components/NotificationMessage'
import NotificationContext from './NotificationContext'
import UserContext from './UserContext'
import { useQuery } from '@tanstack/react-query'

const App = () => {
  const { notification, notificationDispatch } = useContext(NotificationContext)
  const { user, userDispatch } = useContext(UserContext)

  useEffect(() => {
    const userLoggedIn = JSON.parse(window.localStorage.getItem('user'))
    if (userLoggedIn) {
      userDispatch({ type: 'LOGIN', payload: userLoggedIn })
      blogService.setToken(userLoggedIn.token)
    }
  }, [])

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    onError: () => {
      notificationDispatch({
        type: 'ERROR',
        payload: { type: 'error', text: 'Blogien haku epäonnistui' }
      })
    }
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  const blogs = result.data
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)


  const logout = () => {
    window.localStorage.clear()
    userDispatch({ type: 'LOGOUT' })
    blogService.setToken(null)
    notificationDispatch({ type: 'SUCCESS', payload: { type: 'success', text: 'logout succesfull' }  })
  }



  return (

    <Router>
      <div>
        {user && <><Link style={{ padding: 5 }} to='/'>blogs</Link> </>}
        {user && <><Link style={{ padding: 5 }} to='/users'>users</Link> </>}
        {user && <>{ user.name } logged in</>}
        {user && <><button onClick={logout}>logout</button></> }
      </div>
      <div>
        {notification && <NotificationMessage />}
      </div>
      <h2>blog app</h2>
      <Routes>
        <Route path='/' element={user ? <Blogs sortedBlogs={sortedBlogs}/> : <LoginForm />} />
        <Route path='/users' element={user ? <Users /> : <LoginForm />} />
        <Route path='/users/:id' element={user ? <User /> : <LoginForm />} />
        <Route path='/blogs/:id' element={user ? <Blog blogs={blogs}/> : <LoginForm />} />
      </Routes>
    </Router>
  )
}

export default App
