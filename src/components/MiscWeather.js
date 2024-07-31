import React from 'react'

// humidity, pressure, cloud coverage, wind speed

function MiscWeather({ data }) {
  return (
    <div className="weatherContainer">
      <span className="weatherItem">
        <img src='icons/humidity.png' alt="Himidity" /> {data.main.humidity}%
      </span>
      <span className="weatherItem">
        <img src='icons/barometer.png' alt='Barometer' />{data.main.pressure}hPa
      </span>
      <span className="weatherItem">
        <img src='icons/cloud.png' alt='Cloud' />{data.clouds.all}%
      </span>
      <span className="weatherItem">
        <img src='icons/wind.png' alt='Wind' />{data.wind.speed}m/s
      </span>
    </div>
  )
}

export default MiscWeather;