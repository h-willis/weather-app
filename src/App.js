import React, { useState } from 'react';
import LocationDisplay from './components/LocationDisplay';
import SearchBar from './components/SearchBar';
import TemperatureDisplay from './components/TemperatureDisplay'
import keys from './keys'

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState(null);

  const fetchWeatherData = async (city) => {
    setSearch(city);
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keys.OWM_API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      console.log(data);
      setError(null);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  console.log({ search });

  return (
    <div className="App">
      <h1>Weather App</h1>
      <SearchBar onSearch={fetchWeatherData} />
      {error && <p>{error}</p>}
      {weatherData && <LocationDisplay location={search} />}
      {weatherData && <TemperatureDisplay temperature={weatherData.main.temp} />}
    </div>
  );
};

export default App;
