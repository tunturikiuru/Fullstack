import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer' 


const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes
        }
        return state.anecdotes.filter((a) => a.content.includes(state.filter))
    })

    const sortedAnecdotes = [...anecdotes].sort((a,b) => b.votes - a.votes)
    const dispatch = useDispatch()
    
    const vote = (id) => {
        const anecdote = sortedAnecdotes.filter(a => a.id === id)[0].content
        dispatch(voteAnecdote(id))
        dispatch(setNotification(`you voted "${anecdote}"`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
    }

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList