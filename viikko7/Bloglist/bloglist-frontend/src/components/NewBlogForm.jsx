import { useState, useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import NotificationContext from '../NotificationContext'


const NewBlogForm = ({ mockHandler }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const { notificationDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.createNew,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })


  const createNewBlog = async (event) => {
    event.preventDefault()
    try {
      const newBlog = { title, author, url }
      newBlogMutation.mutate({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
      notificationDispatch({ type: 'SUCCESS', payload: { text: `a new blog ${newBlog.title} by ${newBlog.author} added`, type: 'success' } })
    } catch {
      notificationDispatch({ type: 'ERROR', payload: { text: 'error', type: 'error' } })
    }
  }

  /* just for tests */
  const handleSubmit = (event) => {
    event.preventDefault()
    if (mockHandler) {
      mockHandler({ title, author, url })
    } else {
      console.log('handle submit')
      createNewBlog(event)
    }
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default NewBlogForm
