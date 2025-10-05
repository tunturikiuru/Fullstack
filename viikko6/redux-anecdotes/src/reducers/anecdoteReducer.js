import { createSlice } from '@reduxjs/toolkit'
import  anecdoteService  from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote(state, action) {
      state.push(action.payload)
    },
    voteAnecdote(state, action) {
      const changedAnecdote = action.payload
      const id = changedAnecdote.id
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { newAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (anecdote) => {
  return async dispatch => {
    const newObject = await anecdoteService.createNew(anecdote)
    dispatch(newAnecdote(newObject))
  }
}

export const voteAnec = (id) => {
  return async dispatch => {
    const newObject= await anecdoteService.vote(id)
    dispatch(voteAnecdote(newObject))
  }
}

export default anecdoteSlice.reducer