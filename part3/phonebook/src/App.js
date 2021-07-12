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
  const [message, setMessage] = useState({})

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
    if(userExists(newName)) {
      if(window.confirm(`${newName} is already added to phonebook, do you want to edit the number?`)) {
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }
      const id = person.id
      personService
      .update(id, changedPerson)
      .then(returnedPerson => {
        setMessage({
          content: `${newName} has been updated`,
          type: "message"
        })
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setTimeout(() => {
          setMessage(null)
        }, 2000)

      })
      .catch(error => {
        console.log(error.response.data)
        setMessage({
          content: JSON.stringify(error.response.data),
          type: "error"
        })
        
        })
    
    } else {

      }
    } else {

      personService
      .create(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage({
          content: `${newName} has been added`,
          type: "message"
        })
        setTimeout(() => {
          setMessage(null)
        }, 2000)
      })
      .catch(error => {
      console.log(error.response.data)
      setMessage({
        content: JSON.stringify(error.response.data),
        type: "error"
      })
      
      })
    }
  }

  const removePerson = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}?`)) {

    const newPersons = persons.filter((searchperson) => searchperson.id !== person.id)
      personService.remove(person.id)
      .then(
        setPersons(newPersons),
        setMessage({
          content: `${person.name} has been deleted`,
          type: "message"
        }),
        setTimeout(() => {
          setMessage(null)
        }, 2000)
        )
        .catch(error => {
          setMessage({
            content: `${person.name} was already deleted`,
            type: "error"
          })
        })
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