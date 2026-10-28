import { useState } from 'react'
import './App.css'

const api = {
  key: import.meta.env.VITE_WEATHER_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

const formatDate = (date) =>
  date.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

function App() {

  

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
          />
        </div>
        <div className="location-box">
          <div className="location">New York City, US</div>
          <div className="date">{formatDate(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">15°c</div>
          <div className="weather">Sunny</div>
        </div>
      </main>
    </div>
  )
}

export default App