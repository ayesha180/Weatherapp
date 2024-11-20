import React, { useState, useEffect, useRef } from "react";
import WeatherInfo from "./WeatherInfo";
import SearchBar from "./SearchBar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloudRain,
  faCloud,
  faSnowflake,
  faCloudSun,
  faCloudShowersHeavy,
} from "@fortawesome/free-solid-svg-icons";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("London");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef(); // UseRef to retain input value

  const API_KEY = "5d3bd771a4af8b668b109fe38e3ecd06";
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  const getWeatherIcon = (condition, description) => {
    switch (condition) {
      case "Clear":
        return <FontAwesomeIcon icon={faSun} size="3x" />;
      case "Rain":
        return <FontAwesomeIcon icon={faCloudRain} size="3x" />;
      case "Clouds":
        if (description === "few clouds" || description === "scattered clouds") {
          return <FontAwesomeIcon icon={faCloudSun} size="3x" />;
        } else if (description === "broken clouds") {
          return <FontAwesomeIcon icon={faCloudShowersHeavy} size="3x" />;
        } else if (description === "overcast clouds") {
          return <FontAwesomeIcon icon={faCloud} size="3x" />;
        } else {
          return <FontAwesomeIcon icon={faCloud} size="3x" />;
        }
      case "Snow":
        return <FontAwesomeIcon icon={faSnowflake} size="3x" />;
      default:
        return <FontAwesomeIcon icon={faSun} size="3x" />;
    }
  };

  useEffect(() => {
    if (location) {
      setIsLoading(true);
      setError("");
      fetch(`${BASE_URL}?q=${location}&units=metric&appid=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.cod === "404") {
            setError("City not found.");
            setIsLoading(false);
            setWeatherData(null);
          } else {
            setWeatherData(data);
            setIsLoading(false);
          }
        })
        .catch(() => {
          setError("Error fetching weather data. Please try again.");
          setIsLoading(false);
        });
    }
  }, [location]);

  const handleSearch = () => {
    const newLocation = inputRef.current.value;
    if (newLocation.trim()) {
      setLocation(newLocation);
    }
  };

  const icon = weatherData
    ? getWeatherIcon(weatherData.weather[0].main, weatherData.weather[0].description)
    : null;

  return (
    <div className="weather-app">
      <SearchBar handleSearch={handleSearch} inputRef={inputRef} />
      {isLoading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
      {weatherData && (
        <div className="weather-info">
          <h1>Weather in {weatherData.name}</h1>
          <div className="weather-icon">{icon}</div>
          <WeatherInfo weather={weatherData} />
        </div>
      )}
    </div>
  );
};

export default Weather;
