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

const Statistic = (props) => {
  return(
    <tr>
      <td>{props.name}</td>
      <td>{props.statistic}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const sum = good + neutral + bad
  const average = (good - bad) / sum
  const positive = (good / sum) * 100 + "%"

  if (sum === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <h2>Statistics</h2> 
      <table>
      <tbody>
      <Statistic name="Good" statistic={good} />
      <Statistic name="Neutral" statistic={neutral} />
      <Statistic name="Bad" statistic={bad} />
      <Statistic name="Sum" statistic={sum} />
      <Statistic name="Average" statistic={average} />
      <Statistic name="Positive" statistic={positive} />
      </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header />
      <Button handleClick={() => setGood(good + 1)} text="Good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App