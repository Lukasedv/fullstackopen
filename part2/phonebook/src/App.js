import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-1234567'
   }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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
      {persons.map(person =>
        <Person key={person.name} name={person.name} number={person.number} />
        )}
    </div>
  )
}

export default App