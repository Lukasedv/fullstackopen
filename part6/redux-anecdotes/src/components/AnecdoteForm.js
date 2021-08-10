import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { timedNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.timedNotification(`Created new anecdote: "${content}"`, 5000)
  }

  return (
    <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
    <input name="anecdote" />
    <button type="submit">add</button>
  </form>
  </div>
  )
}

export default connect(
  null, 
  { createAnecdote, timedNotification }
)(AnecdoteForm)