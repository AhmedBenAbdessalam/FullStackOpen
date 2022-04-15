import { useState, useEffect } from "react"
import axios from "axios"

const Filter = ({ searchTerm, handleSearch }) => {
  return (
    <>
      <label htmlFor='filter'>find countries </label>
      <input id='filter' value={searchTerm} onChange={handleSearch} />
    </>
  )
}
const Details = ({ country, weather }) => {

  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h2>Languages:</h2>
      <ul>{Object.values(country.languages).map((lang, index) => <li key={index}>{lang}</li>)}</ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common} `}></img>
      <h2>Weather in {country.capital[0]}</h2>
      <p>temperature {Math.round(weather.main.temp - 273.15)} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon"></img>
      <p>wind {weather.wind.speed} m/s</p>
    </>
  )

}

const Display = ({ displayCountries, setDisplayCountries }) => {

  const [weather, setWeather] = useState({})
  useEffect(() => {
    if (displayCountries.length > 0) {
      const path = `https://api.openweathermap.org/data/2.5/weather?lat=${displayCountries[0].latlng
      [0]}&lon=${displayCountries[0].latlng[1]}&appid=${"2f1fed7d74df2a4db187c456cb493c35"}`
      axios.get(path).then(res => res.data).then(data => {
        setWeather(data)
      })
    }
  }, [displayCountries])
  if (displayCountries.length > 10) {
    return <p>{'Too many matches, specify another filter'}</p>
  }
  else if (displayCountries.length === 1) {

    return (
      <Details country={displayCountries[0]} weather={weather} />
    )
  }
  else if (displayCountries.length === 0) {
    return <p>{'Country doesnt exist'}</p>
  }
  else {
    return (
      <>
        {displayCountries.map((country, index) => <p key={index}>{country.name.common} <button onClick={() => {
          setDisplayCountries([country])
        }} >show</button> </p>)}
      </>
    )
  }

}

const App = () => {
  const [countries, setCountries] = useState([])

  const [displayCountries, setDisplayCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }
  useEffect(() => {
    const URL = "https://restcountries.com/v3.1/all"
    axios
      .get(URL)
      .then(res => res.data)
      .then(data => {
        setCountries(data)
      })

  }, [])

  const filterCountries = () => {
    const newDisplayCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
    setDisplayCountries(newDisplayCountries)
  }
  useEffect(filterCountries, [searchTerm, countries])

  return (
    <div>
      <Filter searchTerm={searchTerm} handleSearch={handleSearch} />
      <Display displayCountries={displayCountries} setDisplayCountries={setDisplayCountries} />
    </div>
  );
}

export default App;
