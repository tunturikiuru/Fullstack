import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import Blog from './Blog'
import NotificationContext from '../NotificationContext'
import UserContext from '../UserContext'

const Blogs = () => {
  const { notificationDispatch } = useContext(NotificationContext)
  const { user, userDispatch } = useContext(UserContext)

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
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <BlogForm />
      <div>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    </div>
  )
}

export default Blogs
