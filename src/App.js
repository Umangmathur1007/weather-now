import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getCoordinates = async (cityName) => {
    try {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}`;
      const res = await axios.get(geoUrl);
      if (res.data.results && res.data.results.length > 0) {
        const { latitude, longitude, name, country } = res.data.results[0];
        return { latitude, longitude, name, country };
      } else {
        throw new Error("City not found");
      }
    } catch (err) {
      throw new Error("Unable to find city coordinates");
    }
  };

  const getWeather = async () => {
    if (!city) return;
    setError("");
    setWeather(null);

    try {
      const { latitude, longitude, name, country } = await getCoordinates(city);
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
      const res = await axios.get(weatherUrl);
      const data = res.data.current_weather;
      setWeather({
        city: `${name}, ${country}`,
        temperature: data.temperature,
        windspeed: data.windspeed,
        weathercode: data.weathercode,
      });
    } catch (err) {
      setError("City not found or network error.");
    }
  };

  return (
    <div className="app">
      <h1>🌤️ Weather Now</h1>
      <p>Check the current weather for any city.</p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;
