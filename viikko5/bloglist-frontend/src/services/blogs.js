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
  const config = {
    headers: {authorization: token}
  }
  const result = await axios.post(baseUrl, data, config)
  return result.data
}

export default { getAll, createNew, setToken }