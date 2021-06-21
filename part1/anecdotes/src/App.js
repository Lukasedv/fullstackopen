import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <div>
  <button onClick={handleClick}>
    {text}
  </button>
  </div>
)

const Anecdote = ({ anecdote, votes }) => (
  <div>
    <p>{anecdote}</p>
    <p>Has {votes} votes</p>
  </div>
)


const getRandomInt = (max) => {
  return Math.floor(Math.random() * max)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState([0,0,0,0,0,0,0])
  
  const votd = votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
  
  const handleVote = () => {
    const index = selected
    const new_votes = [...votes]
    new_votes[index] += 1
    setVote(new_votes)
  }

  
  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button text="next anecdote" handleClick={() => setSelected(getRandomInt(anecdotes.length))} />
      <Button text="vote" handleClick={handleVote} />
      <Anecdote anecdote={anecdotes[votd]} votes={votes[votd]}/>
    </div>
  )
}

export default App