import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filterAnecdotes === '') {
            return state.anecdotes
        }
        return state.anecdotes.filter((anec) => anec.content.includes(state.filterAnecdotes))
    })


    anecdotes.sort((a,b) => b.votes - a.votes)
    const dispatch = useDispatch()
    
    const vote = (id) => {
        dispatch(voteAnecdote(id))
    }

    return (
        <div>
            {anecdotes.map(anecdote =>
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