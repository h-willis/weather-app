import React from "react";

const LocationDisplay = ({ location }) => {
  const capitalisedLocation = location[0].toUpperCase() + location.slice(1);
  return (
    <div className="location">
      <p>Weather for {capitalisedLocation}</p>
    </div>
  )
};

export default LocationDisplay;