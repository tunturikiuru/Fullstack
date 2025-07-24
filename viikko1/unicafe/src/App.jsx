import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const Display = ({text}) => <p>{text}</p>
const StatisticLine =  ({text, value, suffix=''}) => <tr><td>{text}</td><td>{value}{suffix}</td></tr>

// harjoittelun vuoksi
const createClickHandler = (increaseValue, value) => {
  return () => increaseValue(value)
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='avarage' value={(good - bad) / total } />
        <StatisticLine text='positive' value={100*good/total} suffix=' %' />
      </tbody>
    </table>
  )
}

const Feedback = ({good, neutral, bad}) => {
  if (good+neutral+bad === 0) {
    return (
      <Display text={'no feedback given'}/>
    )
  }
  return (
    <Statistics good={good} neutral={neutral} bad={bad} />
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback' />
      <Button onClick={createClickHandler(setGood, good + 1)} text='good' />
      <Button onClick={createClickHandler(setNeutral, neutral + 1)} text='neutral' />
      <Button onClick={createClickHandler(setBad, bad + 1)} text='bad' />
      <Header text='statistics' />
      <Feedback good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App