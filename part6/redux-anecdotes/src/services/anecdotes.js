import axios from 'axios'

const baseUrl = 'https://lukasedv-fullstackopen-75rp966924vg-3001.githubpreview.dev/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  
    const getId = () => (100000 * Math.random()).toFixed(0)
    const object = { content, votes: 0, id: getId() }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const voteFor = async (anecdote) => {
  console.log(anecdote)
  const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
  console.log(updatedAnecdote)
    const response = await axios.put(baseUrl + '/' + updatedAnecdote.id, updatedAnecdote)
    return response.data
}

export default { getAll, createNew, voteFor }