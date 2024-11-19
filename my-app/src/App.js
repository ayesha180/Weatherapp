import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import WeatherInfo from './components/WeatherInfo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudRain, faCloud, faSnowflake, faCloudSun, faCloudShowersHeavy } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("London");  // Set default city to London
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = '5d3bd771a4af8b668b109fe38e3ecd06';  // Replace with your OpenWeatherMap API key
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  // Function to get the weather icon and background color based on the weather condition
  const getWeatherIconAndBackground = (condition, description) => {
    switch (condition) {
      case 'Clear':
        return { icon: <FontAwesomeIcon icon={faSun} size="3x" />, background: 'yellow' };
      case 'Rain':
        return { icon: <FontAwesomeIcon icon={faCloudRain} size="3x" />, background: 'lightblue' };
      case 'Clouds':
        if (description === 'few clouds' || description === 'scattered clouds') {
          return { icon: <FontAwesomeIcon icon={faCloudSun} size="3x" />, background: 'lightgray' };
        } else if (description === 'broken clouds') {
          return { icon: <FontAwesomeIcon icon={faCloudShowersHeavy} size="3x" />, background: 'gray' };
        } else if (description === 'overcast clouds') {
          return { icon: <FontAwesomeIcon icon={faCloud} size="3x" />, background: 'darkgray' };
        } else {
          return { icon: <FontAwesomeIcon icon={faCloud} size="3x" />, background: 'lightgray' };
        }
      case 'Snow':
        return { icon: <FontAwesomeIcon icon={faSnowflake} size="3x" />, background: 'lightblue' };
      default:
        return { icon: <FontAwesomeIcon icon={faSun} size="3x" />, background: 'yellow' };
    }
  };

  useEffect(() => {
    if (location) {
      setIsLoading(true);
      setError('');
      fetch(`${BASE_URL}?q=${location}&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          if (data.cod === "404") {
            setError('City not found.');
            setIsLoading(false);
            setWeatherData(null);
          } else {
            setWeatherData(data);
            setIsLoading(false);
          }
        })
        .catch(error => {
          setError('Error fetching weather data. Please try again.');
          setIsLoading(false);
        });
    }
  }, [location]);

  // Get the weather icon and background from the function
  const { icon, background } = weatherData
    ? getWeatherIconAndBackground(weatherData.weather[0].main, weatherData.weather[0].description)
    : { icon: null, background: 'white' };

  return (
    <div className="App" style={{ backgroundColor: background }}>
      <div className="header">
        <h1>Weather App</h1>
      </div>
      <div className="search-bar">
        <SearchBar setLocation={setLocation} />
      </div>
      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {weatherData && (
        <div className="weather-info">
          <h1>Weather in {weatherData.name}</h1>
          <div className="weather-icon">
            {icon}  {/* Display weather icon */}
          </div>
          <WeatherInfo weather={weatherData} />
        </div>
      )}
    </div>
  );
};

export default App;
