import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import NewBlogForm from './NewBlogForm'

const blog = {
  title: 'testiblogi testailua varten',
  author: 'blogin kirjoittaja',
  likes: 12,
  url: 'www...testaddress...fi',
  user: [{ name: 'testaaja' }]
}

test('5.13: renders title', () => {
  render(<Blog blog={blog} blogs={[]} setBlogs={() => {}} user={''} setMessage={() => {}} />)
  const element = screen.getByText('testiblogi testailua varten', { exact: false })
  expect(element).toBeDefined()
})

test('5.14: renders url, likes, user', async () => {
  render(<Blog blog={blog} blogs={[]} setBlogs={() => {}} user={''} setMessage={() => {}} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  expect(screen.getByText('www...testaddress...fi')).toBeVisible()
  expect(screen.getByText('testaaja')).toBeVisible()
  expect(screen.getByText('12', { exact: false })).toBeVisible()
})

test('5.15: can be liked twice', async () => {
  const mockHandler = vi.fn()
  render(<Blog blog={blog} blogs={[]} setBlogs={() => {}} user={''} setMessage={() => {}} onLike={mockHandler}/>)
  const user = userEvent.setup()
  let button = screen.getByText('view')
  await user.click(button)
  button = screen.getByText('like')
  await user.click(button)
  await user.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('5.16: form can be send', async () => {
  const user = userEvent.setup()
  const mockHandler = vi.fn()
  render(<NewBlogForm blogs={[]} setBlogs={() => {}} setMessage={() => {}} mockHandler={mockHandler}/>)

  const title = screen.getByLabelText('title')
  const author = screen.getByLabelText('author')
  const url = screen.getByLabelText('url')

  await userEvent.type(title, 'testing a form...' )
  await userEvent.type(author, 'tester' )
  await userEvent.type(url, 'www.....fi' )
  const button = screen.getByText('create')
  await user.click(button)
  expect(mockHandler.mock.calls[0][0].title).toBe('testing a form...')
  expect(mockHandler.mock.calls[0][0].author).toBe('tester')
  expect(mockHandler.mock.calls[0][0].url).toBe('www.....fi')
})
