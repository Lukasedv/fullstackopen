import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const vote = (anecdote) => {
    dispatch(voteForAnecdote(anecdote.id))
    dispatch(setNotification(`Voted for anecdote "${anecdote.content}"`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return(
      <div>
    {anecdotes.sort(function (a, b) {
        return b.votes - a.votes
      }).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>

      )}
      </div>
  )
}

export default AnecdoteList