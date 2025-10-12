import { useQueryClient, useMutation } from '@tanstack/react-query'
import { createNew } from '../requests/requests'
import NotificationContext from '../../NotificationContext'
import { useContext } from 'react'


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createNew, 
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({type: 'SUCCESS', payload: `anecdote '${data.content}' created`})
    },
    onError: () => {notificationDispatch({type: 'ERROR', payload: `too short anecdote, min length 5`})}
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
