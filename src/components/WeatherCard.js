import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ data }) => {
  const { city, temperature, windspeed, weathercode } = data;

  const weatherDescription = (code) => {
    const map = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Foggy",
      48: "Depositing rime fog",
      51: "Light drizzle",
      61: "Rain",
      71: "Snow fall",
      95: "Thunderstorm",
    };
    return map[code] || "Unknown weather";
  };

  return (
    <div className="card">
      <h2>{city}</h2>
      <h3>{weatherDescription(weathercode)}</h3>
      <p>🌡️ Temperature: {temperature}°C</p>
      <p>💨 Wind Speed: {windspeed} km/h</p>
    </div>
  );
};

export default WeatherCard;
