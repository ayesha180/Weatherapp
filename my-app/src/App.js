import React from "react";
import "./App.css";
import Weather from "./components/Weather";

const App = () => {
  return (
    <div className="App">
      <div className="header">
        <h1>Weather App</h1>
      </div>
      <Weather />
    </div>
  );
};

export default App;
