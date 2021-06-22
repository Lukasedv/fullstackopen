import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const userExists = (name) => {
    return persons.some(function(el) {
      return el.name === name;
    }); 
  }

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
    }
    console.log(newName);
    if(userExists(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
      setNewName('')
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const Person = ({ name }) => {
    return(
      <div>
        {name}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <input 
          value={newName}
          onChange={handleNameChange}
        />
        <button type="submit">save</button> 
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        <Person key={person.name} name={person.name} />
        )}
    </div>
  )
}

export default App