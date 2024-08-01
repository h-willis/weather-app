import React, { useState, useEffect } from 'react'
import axios from 'axios'
import keys from '../keys'

const DEBUG = true;

function SunriseSet({ data }) {
  // okay so turns out timezone data is actually returned from owm, but i want
  // to use another api for practice :)
  const [timezone, setTimezone] = useState(0);

  // whenever data changes, get timezone data from timezonedb api
  useEffect(() => {
    async function getTZ() {
      try {
        const response = await axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=${keys.TIMEZONE_DB_API_KEY}&format=json&by=position&lat=${data.coord.lat}&lng=${data.coord.lon}`);

        if (DEBUG) {
          console.log(`DATA: ${JSON.stringify(response, null, 2)}`);
        }

        setTimezone(Number(response.data.gmtOffset));

      } catch (e) {
        console.dir(`${e}`);
      }
    }

    getTZ();
  }, [data]);


  function formatUnixTime(unix) {
    // js uses ms epoch time?
    const date = new Date((unix + timezone) * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}`;
  }

  return (
    <div className="weatherContainer" style={{ "justifyContent": "space-evenly" }}>
      <span className="weatherItem">
        <img src="icons/sunrise.png" alt="Sunrise" /> {formatUnixTime(data.sys.sunrise)}
      </span>
      <span className="weatherItem" style={{ "justifyContent": "space-evenly" }}>
        <img src="icons/sunset.png" alt="Sunset" /> {formatUnixTime(data.sys.sunset)}
      </span>
    </div>
  )
}

export default SunriseSet;