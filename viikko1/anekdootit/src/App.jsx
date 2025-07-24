import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const randomAnecdote = (setSelected) => {
  let randomValue = Math.floor(Math.random()*8)
  setSelected(randomValue)
}

const vote  = ({setVoted, votes, selected, maxVotes, setMax}) => {
  const copy = { ...votes }
  copy[selected] += 1
  setVoted(copy)

  if (copy[selected] > copy[maxVotes]) {
    setMax(selected)
  }
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVoted] = useState(new Array(anecdotes.length).fill(0))
  const [maxVotes, setMax] = useState(0)

  return (
    <div>
      <Header text='Anecdote of the day'/>
      <p>
        {anecdotes[selected]}<br/>
        has {votes[selected]} votes
        <Button onClick={() => vote({setVoted, votes, selected, maxVotes, setMax})} setChange={setVoted} text={'vote'} />
        <Button onClick={() => randomAnecdote(setSelected)} text={'random anecdote'} />
      </p>
      <Header text='Anecdote with most votes'/>
      {anecdotes[maxVotes]}
    </div>
  )
}

export default App