import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Person from "./components/Person"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import PersonForm from "./components/PersonForm"
import "./index.css"


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchPerson, setSearchPerson] = useState('')
  const [message, setMessage] = useState(null)

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
      if(window.confirm(`${newName} is already added to phonebook, do you want to edit the number?`)) {
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }
      const id = person.id
      personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setMessage(`${newName} has been updated`)
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      }) } else {

      }
    } else {

      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(`${newName} has been added`)
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
    }
  }

  const removePerson = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {

    const newPersons = persons.filter((searchperson) => searchperson.id !== person.id)
      personService.remove(person.id)
      .then(
        setPersons(newPersons),
        setMessage(`${person.name} has been removed`),
        setTimeout(() => {
          setMessage(null)
        }, 2000)
        )
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
      <Notification message={message} />
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