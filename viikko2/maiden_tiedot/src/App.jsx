import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryForm = ({changeInputCountry, inputCountry}) => (
  <form>
    find countries <input onChange={changeInputCountry} value={inputCountry}></input>
  </form>
)

const Button = ({country, setChosenCountry}) => {
  return <button key={country.name.common} onClick={() => setChosenCountry(country)}>Show</button>
}

const DisplayCountries = ({matchedCountries, setChosenCountry, chosenCountry}) => {
  if (chosenCountry) {
    return DisplayCountry(chosenCountry)
  }

  if (matchedCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }
  if (matchedCountries.length === 0) {
    return <></>
  }
  return (
    <div>
      {matchedCountries.map(country => 
      <p key={country.name.common}>
        {country.name.common} 
         <Button country={country} setChosenCountry={setChosenCountry}/>
      </p>)}
    </div>
  )
}

const DisplayCountry = (chosenCountry) => {
  return (
    <div>
      <h1>{chosenCountry.name.common}</h1>
      <p> Capital: {chosenCountry.capital}<br/>Area: {chosenCountry.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(chosenCountry.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={chosenCountry.flags.png} alt={chosenCountry.flags.alt}/>
    </div>
  )
}


function App() {
  const [chosenCountry, setChosenCountry] = useState(null)
  const [countries, setCountries] = useState([])
  const [inputCountry, setInputCountry] = useState('')

  useEffect (() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const changeInputCountry = (event) => {
    setInputCountry(event.target.value)
    setChosenCountry(null)
  }

  const matchedCountries = () => {
    if (!countries || !inputCountry) {
      return []
    }
    const re = new RegExp(inputCountry, 'i')
    const matchingCountries = countries.filter(country => country.name.common.search(re) !== -1)
    if (matchingCountries.length === 1 && !chosenCountry) {
      setChosenCountry(matchingCountries[0])
    }
    return matchingCountries
  }

  return (
    <div>
      <CountryForm changeInputCountry={changeInputCountry} inputCountry={inputCountry} />
      <DisplayCountries matchedCountries={matchedCountries()} setChosenCountry={setChosenCountry} chosenCountry={chosenCountry}/>
    </div>
  )
}

export default App
