import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      return action.payload
    case "ERROR":
      return action.payload
    case "NULL":
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const  NotificationContextProvider = ({ children }) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')

    const notify = (message) => {
        notificationDispatch(message)
        setTimeout(() => {
            notificationDispatch({type: 'NULL'})
        }, 5000)

    }

    return (
        <NotificationContext.Provider value={[notification, notify]}>
            { children }
        </NotificationContext.Provider>
    )
}

export default NotificationContext