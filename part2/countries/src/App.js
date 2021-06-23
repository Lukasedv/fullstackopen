import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearchCountry(event.target.value)
  }

  return (
    <div>
      <h1>Countries</h1>
      <input value={searchCountry} onChange={handleSearch} />
      {countries.filter(country => country.name.toLowerCase().includes(searchCountry)).map(filteredCountry =>
        <p key={filteredCountry.name}>{filteredCountry.name}</p>
        )}
      </div>
  )

}

export default App