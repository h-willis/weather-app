import React, { useState } from 'react'

// humidity, pressure, cloud coverage, wind speed
const WINDUNITS = {
  MS: "m/s",
  FTS: "ft/s",
  MPH: "mph",
  KNOTS: "knots",
  KMPH: "km/h"
}

function MiscWeather({ data }) {
  const [windUnits, setWindUnits] = useState(WINDUNITS.MS);
  function handleOptionChange({ target }) {
    setWindUnits(target.value);
    setIsOpen(false);
  }

  const [isOpen, setIsOpen] = useState(false);
  function toggleIsOpen() {
    setIsOpen(!isOpen);
  }

  function formatWindSpeed(speedMs) {
    let convertedSpeed = speedMs;
    switch (windUnits) {
      case WINDUNITS.FTS:
        convertedSpeed = speedMs * 3.28084;
        break;
      case WINDUNITS.MPH:
        convertedSpeed = speedMs * 2.23694;
        break;
      case WINDUNITS.KNOTS:
        convertedSpeed = speedMs * 1.94384;
        break;
      case WINDUNITS.KMPH:
        convertedSpeed = speedMs * 3.6;
        break;
      default:
        console.log(`Unknown units: ${windUnits}`);
        break;
    }

    return convertedSpeed.toFixed(2) + windUnits;
  }

  const windOptionDropdown = (
    <div className={`unitsDropdown`}>
      <select value={windUnits} onClick={(e) => { e.stopPropagation(); }} onChange={handleOptionChange} >
        <option value={WINDUNITS.MS}>{WINDUNITS.MS}</option>
        <option value={WINDUNITS.FTS}>{WINDUNITS.FTS}</option>
        <option value={WINDUNITS.MPH}>{WINDUNITS.MPH}</option>
        <option value={WINDUNITS.KNOTS}>{WINDUNITS.KNOTS}</option>
        <option value={WINDUNITS.KMPH}>{WINDUNITS.KMPH}</option>
      </select >
    </div>);

  return (
    <div className="weatherContainer">
      <span className="weatherItem" onClick={() => alert("you clicked me")}>
        <img src='icons/humidity.png' alt="Himidity" /> {data.main.humidity}%
      </span>
      <span className="weatherItem">
        <img src='icons/barometer.png' alt='Barometer' />{data.main.pressure}hPa
      </span>
      <span className="weatherItem">
        <img src='icons/cloud.png' alt='Cloud' />{data.clouds.all}%
      </span>
      <span className="weatherItem" onClick={toggleIsOpen}>
        <img src='icons/wind.png' alt='Wind' />{formatWindSpeed(data.wind.speed)}
        {isOpen && windOptionDropdown}
      </span>
    </div>
  );
}

export default MiscWeather;