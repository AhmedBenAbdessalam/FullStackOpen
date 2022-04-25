import { useEffect, useState } from 'react'
import userService from '../services/users'
const UserList = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    userService.getAll().then(users => setUsers(users))
  }, [])
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
const User = () => {
  return (
    <div>
      <h2>Users</h2>
      <UserList />
    </div>
  )
}
export default User