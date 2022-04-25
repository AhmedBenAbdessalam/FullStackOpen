import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'

const Navigation = ({ message }) => {
  const padding = {
    padding: 5,
    backgroundColor: '#aaa'
  }
  const dispatch = useDispatch()
  return (
    <div style={padding}>
      <Link to="/" >blogs</Link> <Link to="/users" >users</Link> {message} <button onClick={() => dispatch(logout())}>logout</button>
    </div>
  )
}

export default Navigation