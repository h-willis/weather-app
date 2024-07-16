import React from 'react';

const TemperatureDisplay = ({ temperature }) => {
  return (
    <div className="temperture-display">
      <p>Temperature: {temperature}</p>
    </div>
  )
}

export default TemperatureDisplay