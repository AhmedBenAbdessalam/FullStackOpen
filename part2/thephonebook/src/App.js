import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const HandleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const HandleAddPerson = (e) => {
    e.preventDefault()
    const newPerson = { name: newName }

    const found = persons.find((p) => p.name === newPerson.name)
    if (found) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons([...persons, newPerson])
    }
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={HandleAddPerson}>
        <div>
          name: <input value={newName} onChange={HandleNameChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App