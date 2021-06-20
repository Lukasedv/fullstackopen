import React, { useState } from 'react'

const Header = () => {
  return(
    <div>
      <h1>Give feedback</h1>
    </div>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  return(
    <div>
      <h2>Statistics</h2> 
      <p>Good {props.stats[0]} </p>
      <p>Neutral {props.stats[1]}</p>
      <p>Bad {props.stats[2]}</p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const stats = [good, neutral, bad]
  console.log(stats)

  return (
    <div>
      <Header />
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics stats={stats}/>
    </div>
  )
}

export default App