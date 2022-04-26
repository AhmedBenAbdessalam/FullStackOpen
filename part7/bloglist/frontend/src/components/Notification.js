import { Alert } from '@mui/material'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
    return state.notification
  }
  )
  if (!notification || notification.message === '') {
    return null
  }
  return (
    <Alert severity={notification.style}>
      {notification.message}
    </Alert>
  )
}

export default Notification