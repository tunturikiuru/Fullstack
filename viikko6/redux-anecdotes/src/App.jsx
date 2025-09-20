import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, newAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  anecdotes.sort((a,b) => b.votes - a.votes)
  const dispatch = useDispatch()


  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const createNew = (event) => {
    event.preventDefault()
    const anecdote = event.target.new.value
    event.target.new.value = ''
    dispatch(newAnecdote(anecdote))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
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
      <h2>create new</h2>
      <form onSubmit={createNew}>
        <div><input name='new' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App