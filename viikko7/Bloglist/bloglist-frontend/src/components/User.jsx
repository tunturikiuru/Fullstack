import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'


const User = () => {
  const id = useParams().id
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getUser(id).then(user => setUser(user))
  },[])

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <div>
        <ul>
          {user.blogs.map(blog => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default User