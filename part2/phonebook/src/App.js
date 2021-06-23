import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchPerson, setSearchPerson] = useState('')

  const userExists = (name) => {
    return persons.some(function(el) {
      return el.name === name;
    }); 
  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    console.log(newName);
    if(userExists(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchPerson(event.target.value)
  }

  const Person = ({ name, number }) => {
    return(
      <div>
        {name} {number}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <input 
          value={searchPerson}
          onChange={handleSearch}
      />
      <h3>add a new person</h3>
      <form onSubmit={addPerson}>
      <div>
        Name 
        <input 
          value={newName}
          onChange={handleNameChange}
        />
        </div>
        <div>
        Number
        <input 
          value={newNumber}
          onChange={handleNumberChange}
        />
        </div>
        <button type="submit">save</button> 
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.name.includes(searchPerson)).map(filteredPerson =>
        <Person key={filteredPerson.name} name={filteredPerson.name} number={filteredPerson.number} />
        )}
    </div>
  )
}

export default App