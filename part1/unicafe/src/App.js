import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Stat = ({ value, text }) => <p>{text} {value}</p>
const Statistics = ({ good, neutral, bad }) => {

  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = (good / all) * 100
  return (
    <>
      <h1>statistics</h1>
      <Stat text={"good"} value={good} />
      <Stat text={"neutral"} value={neutral} />
      <Stat text={"bad"} value={bad} />
      <Stat text={"all"} value={all} />
      <Stat text={"average"} value={average} />
      <Stat text={"positive"} value={positive + " %"} />
    </>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button onClick={() => setGood(good + 1)} text={"good"} />
      <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button onClick={() => setBad(bad + 1)} text={"bad"} />
      <Statistics good={good} neutral={neutral} bad={bad} />


    </div>
  )
}

export default App