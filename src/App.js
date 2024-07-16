import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import keys from './keys'
// import WeatherDisplay from './components/WeatherDisplay'; // Assume you have this component to display weather data

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keys.OWM_API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      // setWeatherData(data);
      console.log(data);
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <SearchBar onSearch={fetchWeatherData} />
      {error && <p>{error}</p>}
      {/* {weatherData && <WeatherDisplay data={weatherData} />} */}
    </div>
  );
};

export default App;
