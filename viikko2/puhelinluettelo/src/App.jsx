import { useState, useEffect } from 'react'
import personService from './services/person'

const DisplayPersons = ({persons, findName, deletePerson}) => {
  if (findName) {
    const re = new RegExp(`${findName}`, "i")
    persons = persons.filter(person => person.name.match(re))
  }
  return(
    <div>{persons.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={deletePerson} value={person.id}>delete</button></p>)}</div>
  )
}

const PersonForm = ({saveNew, newName, changeNewPerson, newNumber, changeNewNumber}) => {
  return (
    <form onSubmit={saveNew}>
      <div>
        name: <input value={newName} onChange={changeNewPerson}/><br/>
        number: <input value={newNumber} onChange={changeNewNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const FilterPerson = ({findName, changeFindName}) => (
  <div>filter shown with<input value={findName} onChange={changeFindName}/></div>
)

const Notification = ({message, setMessage}) => {
  if (message === null) {
    return null
  }
  const messageStyle = {
    color: message.type === 'error' ? "red" : "green",
    background: message.type === 'error' ? "lightgrey" : "lightgreen",
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  setTimeout(() => {
    setMessage(null)
  }, 5000)
  return <div style={messageStyle}>{message.text}</div>
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [findName, setFindName] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response))
    }, [])


  const changePerson = (existingPerson) => {
    if (!confirm(`${existingPerson.name} is already added to phonebook, replace the old number with new one?`)) {
      return
    }
    const changedPerson = { ...existingPerson, number: newNumber}
    personService
      .replaceNumber(changedPerson)
      .then(response => {
        setPersons(persons.map(person => person.id !== response.id ? person : response))
        setMessage({text: `Changed number, ${changedPerson.name}`, type: 'success'})
      })
      .catch(error => {
        setMessage({text: `Information of ${existingPerson.name} has already been removed from server`, type: 'error'})
        setPersons(persons.filter(person => person.id !== existingPerson.id))
      })
  }

  const createNew = () => {
    const newOne = {name: newName, number: newNumber}
    personService
      .create(newOne)
      .then(returnedPerson => {
        setPersons([...persons, returnedPerson])
        setMessage({text: `Added ${newOne.name}`, type: 'success'})
      })
    }

  const saveNew = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      changePerson(existingPerson)
    } else {
      createNew()
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (event) => {
    let idToDelete = event.target.value
    personService
      .findPerson(idToDelete)
      .then(returnedPerson => {
        if (confirm(`Delete ${returnedPerson.name}?`)) {
          personService
          .del(returnedPerson.id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== returnedPerson.id))
            setMessage({text: `Deleted ${returnedPerson.name}`, type: 'success'})
          })
        } 
      })
      .catch(error => {
        setMessage({text: `Information has already been removed from server`, type: 'error'})
        setPersons(persons.filter(person => person.id !== idToDelete))
      })
  }

  const changeNewPerson = (event) => {
    setNewName(event.target.value)
  }
  const changeNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const changeFindName = (event) => {
    setFindName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} setMessage={setMessage}/>
      <FilterPerson findName={findName} changeFindName={changeFindName}/>
      <h2>Add a new</h2>
      <PersonForm saveNew={saveNew} newName={newName} changeNewPerson={changeNewPerson} newNumber={newNumber} changeNewNumber={changeNewNumber}/>
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} findName={findName} deletePerson={deletePerson}/>
    </div>
  )

}

export default App