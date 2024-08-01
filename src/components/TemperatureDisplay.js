import React, { useState } from 'react';

// const TEMPERATUREUNITS = {
//   C: "Celsius",
//   F: "Farenheit"
// }

const TEMPERATUREUNITS = {
  C: "°C",
  F: "°F"
}

const TemperatureDisplay = ({ temperatureData }) => {
  const [units, setUnits] = useState(TEMPERATUREUNITS.C);

  function formatTemperature(temperature) {
    if (units === TEMPERATUREUNITS.C) {
      return temperature.toFixed(2) + TEMPERATUREUNITS.C;
    }

    let farenheit = (temperature * 9 / 5) + 32;
    return farenheit.toFixed(2) + TEMPERATUREUNITS.F;
  }

  return (
    <div className="weatherContainer">
      <span className='weatherItem'>
        <img src='icons/thermometer.png' alt="Thermometer" /> {formatTemperature(temperatureData.temp)}
      </span>
      <span className='weatherItem'>
        <img src='icons/thermometer_high.png' alt='Thermometer High' />{formatTemperature(temperatureData.temp_max)}
      </span>
      <span className='weatherItem'>
        <img src='icons/thermometer_low.png' alt='Thermometer Low' />{formatTemperature(temperatureData.temp_min)}
      </span>
      <span className='weatherItem'>
        <img src='icons/temperature-feels-like.svg' alt='Thermometer Feels Like' />{formatTemperature(temperatureData.feels_like)}
      </span>
      <select value={units} onChange={(e) => setUnits(e.target.value)}>
        <option value={TEMPERATUREUNITS.C}>{TEMPERATUREUNITS.C}</option>
        <option value={TEMPERATUREUNITS.F}>{TEMPERATUREUNITS.F}</option>
      </select>
    </div>
  )
}

export default TemperatureDisplay;