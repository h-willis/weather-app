import React, { useState } from 'react';
import axios from 'axios'
import LocationDisplay from './components/LocationDisplay';
import SearchBar from './components/SearchBar';
import TemperatureDisplay from './components/TemperatureDisplay'
import keys from './keys'
import './styles.css'
import MiscWeather from './components/MiscWeather';
import SunriseSet from './components/SunriseSet';
import Map from './components/Map';

const DEBUG = false;

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

      if (DEBUG) {
        console.log(`DATA: ${JSON.stringify(response, null, 2)}`);
      }

      setError(null);
      setWeatherData(response.data);

    } catch (err) {
      setWeatherData(null);

      switch (err.response.status) {
        case 400:
        // when search is < 3 chars long, just fall through to 404
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

  // TODO fancy stylings: inital loading, pulsing loading..., smooth appearance
  // of weather

  return (
    <>
      <div className="container">
        <h1 style={{ "margin": "50px 0" }}>Weatheroogle</h1>
        <SearchBar onSearch={fetchWeatherData} />
        {loading && <h2 style={{ "margin": "25px 0" }}>Loading...</h2>}
        {error && <p style={{ "margin": "25px 0" }}>{error}</p>}
        <div className='weather'>
          {weatherData && <LocationDisplay location={search} />}
          {weatherData && <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon" />}
          {/* {weatherData && <h3>{weatherData.weather[0].description}</h3>} */}
          {weatherData && <TemperatureDisplay temperatureData={weatherData.main} />}
          {weatherData && <MiscWeather data={weatherData} />}
          {weatherData && <SunriseSet data={weatherData.sys} />}
        </div>
        {weatherData && <Map coords={weatherData.coord} />}
      </div>
    </>
  );
};

export default App;
