import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    newNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return ''
    }
  }
})

export const { newNotification, clearNotification } = notificationSlice.actions

export const setNotification = (text, time) => {
  return dispatch => {
    dispatch(newNotification(text))
    setTimeout(() => {dispatch(clearNotification())}, time*1000)
  }

}
export default notificationSlice.reducer