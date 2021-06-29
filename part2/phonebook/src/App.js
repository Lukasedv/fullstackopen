import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from "./components/Person"
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchPerson, setSearchPerson] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        console.log(returnedPerson, "added")
      })
    }
  }

  const removePerson = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {

    const newPersons = persons.filter((searchperson) => searchperson.id !== person.id)
      personService.remove(person.id)
      .then(setPersons(newPersons))
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchPerson} onChange={handleSearch} />
      <h3>add a new person</h3>
      <PersonForm 
        onSubmit={addPerson}
        name={newName}
        number={newNumber}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {persons.filter(person => person.name.toLowerCase().includes(searchPerson.toLowerCase())).map(filteredPerson =>
        <Person 
        key={filteredPerson.name} 
        name={filteredPerson.name} 
        number={filteredPerson.number} 
        removePerson={() => removePerson(filteredPerson)}
        />
        )}
    </div>
  )
}

export default App