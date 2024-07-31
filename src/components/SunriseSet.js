import React from 'react'

function SunriseSet({ data }) {

  function formatUnixTime(unix) {
    // js uses ms epoch time?
    const date = new Date(unix * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }

  return (
    <div className="weatherContainer" style={{ "justifyContent": "space-evenly" }}>
      <span className="weatherItem">
        <img src="icons/sunrise.png" alt="Sunrise" /> {formatUnixTime(data.sunrise)}
      </span>
      <span className="weatherItem" style={{ "justifyContent": "space-evenly" }}>
        <img src="icons/sunset.png" alt="Sunset" /> {formatUnixTime(data.sunset)}
      </span>
    </div>
  )
}

export default SunriseSet;