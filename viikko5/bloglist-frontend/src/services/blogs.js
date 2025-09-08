import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async data  => {
  const config = { headers: { authorization: token } }
  const result = await axios.post(baseUrl, data, config)
  console.log(result.data)
  return result.data
}

const updateLikes = async ({ id, ...data }) => {
  const config = { headers: { authorization: token } }
  const result = await axios.put(`${baseUrl}/${id}`, data, config)
  return result.data
}

const removeBlog = async ({ id }) => {
  const config = { headers: { authorization: token } }
  const result = await axios.delete(`${baseUrl}/${id}`, config)
  return result
}

export default { getAll, createNew, setToken, updateLikes, removeBlog }