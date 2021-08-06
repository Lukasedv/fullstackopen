import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

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
            <button onClick={() => dispatch(voteForAnecdote(anecdote.id))}>vote</button>
          </div>
        </div>

      )}
      </div>
  )
}

export default AnecdoteList