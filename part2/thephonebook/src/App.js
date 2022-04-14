import { useState } from 'react'

const SearchFilter = ({ searchTerm, setSearchTerm }) => {
  const HandleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }
  return (
    <div>
      filter shown with<input value={searchTerm} onChange={HandleSearchChange} ></input>
    </div>
  )
}


const AddPerson = ({ HandleAddPerson, newName, HandleNameChange, newNumber, HandleNumberChange }) => {
  return (
    <form onSubmit={HandleAddPerson}>
      <div>
        name: <input value={newName} onChange={HandleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={HandleNumberChange} />
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}

const DisplayNumbers = ({ persons, searchTerm }) => {
  return (
    <>
      {persons.map(person => {
        if (person.name.toUpperCase().includes(searchTerm.toUpperCase())) {
          console.log(person.name);
          return (
            <p key={person.name}>{person.name} {person.number}</p>
          )
        }
        else
          return ''
      })}
      {console.log("done")}
    </>

  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  const HandleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const HandleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }



  const HandleAddPerson = (e) => {
    e.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    const found = persons.find((p) => p.name === newPerson.name)
    if (found) {
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons([...persons, newPerson])
    }
    setNewName('')
    setNewNumber('')
  }
  const [searchTerm, setSearchTerm] = useState('')


  return (
    <div>
      <h2>Phonebook</h2>
      <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h2>add a new</h2>
      <AddPerson HandleAddPerson={HandleAddPerson} newName={newName} HandleNameChange={HandleNameChange} newNumber={newNumber} HandleNumberChange={HandleNumberChange} />
      <h2>Numbers</h2>
      <DisplayNumbers persons={persons} searchTerm={searchTerm} />
    </div>
  )
}

export default App