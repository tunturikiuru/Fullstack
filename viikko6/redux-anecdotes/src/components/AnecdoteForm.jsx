import { useDispatch } from 'react-redux'
import { createNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const createNew = (event) => {
        event.preventDefault()
        const anecdote = event.target.new.value
        event.target.new.value = ''
        dispatch(createNewAnecdote(anecdote))
        dispatch(setNotification(`you created '${anecdote}'`, 3))
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