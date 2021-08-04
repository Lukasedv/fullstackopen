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

const like = async (likeObject, id) => {
  const config = {
    headers: { Authorization: token },
  }

  const likeUrl = baseUrl + '/' + id
  console.log(likeUrl)

  const response = await axios.put(likeUrl, likeObject, config)
  return response.data
}

export default { getAll, setToken, create, like }