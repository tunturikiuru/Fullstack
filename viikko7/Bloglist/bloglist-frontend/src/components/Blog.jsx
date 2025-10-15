import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import NotificationContext from '../NotificationContext'
import { useParams } from 'react-router-dom'

const Blog = ({ blogs, onLike }) => {
  const { notificationDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const id = useParams().id

  const blog = blogs.find(b => b.id === id)

  const likeBlogMutation = useMutation({
    mutationFn: blogService.updateLikes,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.removeBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    }
  })

  const addLike = async () => {
    likeBlogMutation.mutate({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user[0]?.id,
    })
  }

  // not needed anymore?
  const removeBlog = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      try {
        removeBlogMutation.mutate({ id: blog.id })
        notificationDispatch({ type: 'SUCCESS', payload: { text: `blog '${blog.title}' removed`, type: 'success' } })
      } catch (error) {
        notificationDispatch({ type: 'ERROR', payload: { text: error, type: 'error' } })
      }
    }
  }

  /* just for tests :( */
  const handleLike = () => {
    if (onLike) {
      onLike()
    } else {
      addLike()
    }
  }

  /* 'added by unknown user' for few old database entries */
  return (
    <div>
      <h2>{blog.title} {blog.author} </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes: {blog.likes}{' '}
        <button onClick={() => handleLike()}>like</button>
      </div>
      <div>{blog.user[0]?.name || 'added by unknown user'}</div>
    </div>
  )
}

export default Blog
