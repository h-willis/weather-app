import React, { useState } from 'react';

const TEMPERATUREUNITS = {
  C: "°C",
  F: "°F"
}

const TemperatureDisplay = ({ temperatureData }) => {
  const [isTempOpen, setIsTempOpen] = useState(false);
  const [isHighOpen, setIsHighOpen] = useState(false);
  const [isLowOpen, setIsLowOpen] = useState(false);
  const [isFeelsOpen, setIsFeelsOpen] = useState(false);

  function toggleIsOpen(e) {
    switch (e.target.id) {
      case 'temperature':
        setIsTempOpen(!isTempOpen);
        setIsHighOpen(false);
        setIsLowOpen(false);
        setIsFeelsOpen(false);
        break;
      case 'temperatureHigh':
        setIsTempOpen(false);
        setIsHighOpen(!isHighOpen);
        setIsLowOpen(false);
        setIsFeelsOpen(false);
        break;
      case 'temperatureLow':
        setIsTempOpen(false);
        setIsHighOpen(false);
        setIsLowOpen(!isLowOpen);
        setIsFeelsOpen(false);
        break;
      case 'temperatureFeel':
        setIsTempOpen(false);
        setIsHighOpen(false);
        setIsLowOpen(false);
        setIsFeelsOpen(!isFeelsOpen);
        break;
      default:
        alert('WTF did you click?');
    }
  }

  const [units, setUnits] = useState(TEMPERATUREUNITS.C);
  const handleOptionChange = ({ target }) => {
    setUnits(target.value);
    setIsTempOpen(false);
    setIsHighOpen(false);
    setIsLowOpen(false);
    setIsFeelsOpen(false);
  }

  function formatTemperature(temperature) {
    if (units === TEMPERATUREUNITS.C) {
      return temperature.toFixed(2) + TEMPERATUREUNITS.C;
    }

    let farenheit = (temperature * 9 / 5) + 32;
    return farenheit.toFixed(2) + TEMPERATUREUNITS.F;
  }

  const optionDropdown = (
    <div className={`unitsDropdown`}>
      <select value={units} onClick={(e) => { e.stopPropagation(); }} onChange={handleOptionChange} >
        <option value={TEMPERATUREUNITS.C}>{TEMPERATUREUNITS.C}</option>
        <option value={TEMPERATUREUNITS.F}>{TEMPERATUREUNITS.F}</option>
      </select >
    </div>)

  return (
    <>
      <div className="weatherContainer">
        <span className='weatherItem' id='temperature' onClick={toggleIsOpen}>
          <img src='icons/thermometer.png' alt="Thermometer" id='temperature' /> {formatTemperature(temperatureData.temp)}
          {isTempOpen && optionDropdown}
        </span>
        <span className='weatherItem' id='temperatureHigh' onClick={toggleIsOpen}>
          <img src='icons/thermometer_high.png' alt='Thermometer High' id='temperatureHigh' />{formatTemperature(temperatureData.temp_max)}
          {isHighOpen && optionDropdown}
        </span>
        <span className='weatherItem' id='temperatureLow' onClick={toggleIsOpen}>
          <img src='icons/thermometer_low.png' alt='Thermometer Low' id='temperatureLow' />{formatTemperature(temperatureData.temp_min)}
          {isLowOpen && optionDropdown}
        </span>
        <span className='weatherItem' id='temperatureFeel' onClick={toggleIsOpen}>
          <img src='icons/temperature-feels-like.svg' alt='Thermometer Feels Like' id='temperatureFeel' />{formatTemperature(temperatureData.feels_like)}
          {isFeelsOpen && optionDropdown}
        </span>
      </div>
    </>
  )
}

export default TemperatureDisplay;
