import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
import AnecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNew = async (event) => {
        event.preventDefault()
        const anecdote = event.target.new.value
        event.target.new.value = ''
        const createdObject = await AnecdoteService.createNew(anecdote)
        dispatch(newAnecdote(createdObject))
        dispatch(setNotification(`you created "${anecdote}"`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={createNew}>
                <div><input name='new' /></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm