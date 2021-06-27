import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ searchCountry, setSearchCountry] = useState('')
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const Display = ({ countries, handleSearch }) => {
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
          <Country 
            key={country.name} 
            country={country} 
            format="long" 
          />
          )}
        </div>)
    } else {
    return(
      <div>
        {countries.map(country => 
          <Country
            key={country.name} 
            country={country} 
            format="short"
            handleSearch={handleSearch}
          />
          )}
      </div>
    )
  }
  }

  const Country = ({ country, format, handleSearch }) => {
    if(format === "short") {
    return(
      <div>
        {country.name}
        <button onClick={handleSearch} value={country.name}>Show</button>
      </div>
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
        <h3>The weather in {country.capital}</h3>
      </div>
      )
    }
  }


  const handleSearch = (event) => {
    setSearchCountry(event.target.value)
  }

  const filteredCountries = (searchCountry) => {
    return(
      countries.filter(country => country.name.toLowerCase().includes(searchCountry.toLowerCase()))
    )
  }

  return (
    <div>
      <h1>Countries</h1>
      <input 
        type="text"
        value={searchCountry} 
        onChange={handleSearch} 
      />
      <Display 
        countries={filteredCountries(searchCountry)} 
        handleSearch={handleSearch}
      />
    </div>
  )

}

export default App