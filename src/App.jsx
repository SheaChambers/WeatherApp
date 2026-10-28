import { useState } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const API_BASE = "https://api.openweathermap.org/data/2.5/"

const formatDate = (date) =>
  date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState({})
  const [error, setError] = useState('')

  const search = async (evt) => {
    if (evt.key !== 'Enter' || !query.trim()) return

    try {
      const res = await fetch(
        `${API_BASE}weather?q=${encodeURIComponent(query.trim())}&units=metric&appid=${API_KEY}`
      )
      const result = await res.json()

      if (res.ok) {
        setWeather(result)
        setError('')
      } else {
        setWeather({})
        setError(res.status === 404 ? 'Location not found' : 'Something went wrong')
      }
    } catch {
      setWeather({})
      setError('Could not connect. Check your internet connection.')
    }

    setQuery('')
  }

  const isWarm = weather.main?.temp > 16

  return (
    <div className={isWarm ? 'app warm' : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
          />
        </div>

        {error && (
          <div className="location-box">
            <div className="location">{error}</div>
          </div>
        )}

        {weather.main && (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{formatDate(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App