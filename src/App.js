import React, { useState } from 'react';
import LocationDisplay from './components/LocationDisplay';
import SearchBar from './components/SearchBar';
import TemperatureDisplay from './components/TemperatureDisplay'
import keys from './keys'

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = async (city) => {
    setSearch(city);
    try {
      setLoading(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keys.OWM_API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error(`"${city}" not found`);
      }
      const data = await response.json();
      console.log(data);
      setError(null);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <SearchBar onSearch={fetchWeatherData} />
      {loading && <h2>Loading...</h2>}
      {error && <p>{error}</p>}
      {weatherData && <LocationDisplay location={search} />}
      {weatherData && <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon" />}
      {weatherData && <TemperatureDisplay temperatureData={weatherData.main} />}
    </div>
  );
};

export default App;
