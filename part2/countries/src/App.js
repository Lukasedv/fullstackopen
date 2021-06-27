import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ filteredCountries, setFilteredCountries] = useState([])
  const [ searchCountry, setSearchCountry] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  const Display = ({ countries }) => {
    if(countries.length > 10) {
      return(
        <div>
          Too many matches
        </div>
      )
    } else if(countries.length === 1) {
      return(
        <div>
        {countries.map(country => 
          <Country country={country} format="long" />
          )}
        </div>)
    } else {
    return(
      <div>
        {countries.map(country => 
          <Country country={country} format="short" />
          )}
      </div>
    )
  }
  }

  const Country = ({ country, format }) => {
    if(format === "short") {
    return(
      <div>{country.name}</div>
    )} else if(format === "long") {
      return(
      <div>
        <h2>{country.name}</h2>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        <ul>
        {country.languages.map(language => 
          <li key={language.name}>{language.name}</li>
        )}
        </ul>
        <img src={country.flag} width="100" alt={country.name}></img>

      </div>
      )
    }
  }

  const handleSearch = (event) => {
    setSearchCountry(event.target.value)
    setFilteredCountries(countries.filter(country => country.name.toLowerCase().includes(event.target.value)))
  }  


  return (
    <div>
      <h1>Countries</h1>
      <input 
        type="text"
        value={searchCountry} 
        onChange={handleSearch} 
      />
      <Display countries={filteredCountries}/>
    </div>
  )

}

export default App