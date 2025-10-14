import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const NotificationMessage = () => {
  const { notification, notificationDispatch } = useContext(NotificationContext)

  if (!notification) {
    return null
  }
  const messageStyle = {
    color: notification.type === 'error' ? 'red' : 'green',
    fontSize: '30px',
    border: notification.type === 'error' ? '3px solid red' : '3px solid green',
  }
  setTimeout(() => {
    notificationDispatch({ type: 'CLEAR' })
  }, 5000)

  return (
    <div>
      <p style={messageStyle}>{notification.text}</p>
    </div>
  )
}

export default NotificationMessage
