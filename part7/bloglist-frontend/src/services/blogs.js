import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blogObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, blogObject, config)
  return response.data
}

const like = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const updatedBlog = { ...blog, likes: blog.likes + 1 }
  const response = await axios.put(baseUrl + '/' + updatedBlog.id, updatedBlog, config)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }

  const deleteUrl = baseUrl + '/' + blog.id

  const response = await axios.delete(deleteUrl, config)
  return response.data
}

export default { getAll, setToken, create, like, remove }