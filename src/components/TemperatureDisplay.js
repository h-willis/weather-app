import React from 'react';

const TemperatureDisplay = ({ temperatureData }) => {
  return (
    <div className="container">
      <p>Temperature: {temperatureData.temp}</p>
      <p>Feels like: {temperatureData.feels_like}</p>
      <p>High: {temperatureData.temp_max}</p>
      <p>Low: {temperatureData.temp_min}</p>
    </div>
  )
}

export default TemperatureDisplay;