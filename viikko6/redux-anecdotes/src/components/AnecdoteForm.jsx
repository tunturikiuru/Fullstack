import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNew = (event) => {
        event.preventDefault()
        const anecdote = event.target.new.value
        event.target.new.value = ''
        dispatch(newAnecdote(anecdote))
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