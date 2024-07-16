import React from "react";

const LocationDisplay = ({ location }) => {
  return (
    <div className="location-cls">
      <p>Weather for {location}</p>
    </div>
  )
};

export default LocationDisplay;