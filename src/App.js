import React, { useState, useEffect } from 'react';
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
    setTimezone(null);

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

  // okay so turns out timezone data is actually returned from owm, but i want
  // to use another api for practice :)
  const [timezone, setTimezone] = useState(null);
  // whenever data changes, get timezone data from timezonedb api
  useEffect(() => {
    async function getTZ() {
      try {
        const response = await axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=${keys.TIMEZONE_DB_API_KEY}&format=json&by=position&lat=${weatherData.coord.lat}&lng=${weatherData.coord.lon}`);

        if (DEBUG) {
          console.log(`DATA: ${JSON.stringify(response, null, 2)}`);
        }

        setTimezone(Number(response.data.gmtOffset));

      } catch (e) {
        console.dir(`${e}`);
        // this will stop stuff from rendering but meh I'm just gunna trust the
        // api for now
        setTimezone(null);
      }
    }

    getTZ();
  }, [weatherData]);

  // TODO fancy stylings: inital loading, pulsing loading..., smooth appearance
  // of weather
  const ready = (timezone !== null) && !loading;

  return (
    <>
      <div className="container">
        <h1 style={{ "margin": "50px 0" }}>Weatheroogle</h1>
        <SearchBar onSearch={fetchWeatherData} />
        {loading && !ready && <h2 style={{ "margin": "25px 0" }}>Loading...</h2>}
        {error && <p style={{ "margin": "25px 0" }}>{error}</p>}
        <div className='weather'>
          {ready && <LocationDisplay location={search} />}
          {ready && <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="Weather Icon" />}
          {ready && <TemperatureDisplay temperatureData={weatherData.main} />}
          {ready && <MiscWeather data={weatherData} />}
          {ready && <SunriseSet data={weatherData} timezone={timezone} />}
        </div>
        {ready && <Map coords={weatherData.coord} />}
      </div>
    </>
  );
};

export default App;
