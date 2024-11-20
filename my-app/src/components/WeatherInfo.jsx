import React from "react";

const WeatherInfo = ({ weather }) => {
  if (!weather) return <p>Loading...</p>;

  
  const weatherCondition = weather.weather[0].main.toLowerCase();

  return (
    <div className={`weather-info ${weatherCondition}`}>
      <h2>{weather.name}</h2>
      <p>{weather.weather[0].description}</p>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
    </div>
  );
};

export default WeatherInfo;
