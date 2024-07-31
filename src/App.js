import React, { useState } from 'react';
import axios from 'axios'
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
    setLoading(true);

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keys.OWM_API_KEY}&units=metric`);

      setError(null);
      setWeatherData(response.data);

    } catch (err) {
      setWeatherData(null);

      switch (err.response.status) {
        case 404:
          setError(`"${city}" not found`);
          break;
        default:
          setError(err.message)
          break;
      }
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
