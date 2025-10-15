import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import blogService from '../services/blogs'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    blogService.allUsers().then(users => setUsers(users))
  })

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users