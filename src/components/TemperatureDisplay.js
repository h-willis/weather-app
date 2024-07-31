import React from 'react';

const TemperatureDisplay = ({ temperatureData }) => {
  return (
    <div className="weatherContainer">
      <span className='weatherItem'>
        <img src='icons/thermometer.png' alt="Thermometer" /> {temperatureData.temp}°C
      </span>
      <span className='weatherItem'>
        <img src='icons/thermometer_high.png' alt='Thermometer High' />{temperatureData.temp_max}°C
      </span>
      <span className='weatherItem'>
        <img src='icons/thermometer_low.png' alt='Thermometer Low' />{temperatureData.temp_min}°C
      </span>
      <span className='weatherItem'>
        <img src='icons/temperature-feels-like.svg' alt='Thermometer Feels Like' />{temperatureData.feels_like}°C
      </span>
    </div>
  )
}

export default TemperatureDisplay;