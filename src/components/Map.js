import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Set up the default icon for markers
const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;


// Leaflet maps are immutable so just updating position doesn't work to cause
// tile layer to update
// This sits as a child of the MapContainer 
function ChangeView({ position }) {
  const map = useMap();
  map.setView(position, 13);
  return null;
}

function Map({ coords }) {
  const position = [coords.lat, coords.lon];
  console.log(`position: ${JSON.stringify(position)}`);

  return (
    <div className="map">
      <MapContainer center={position} zoom={50} scrollWheelZoom={false} style={{ height: "100%", width: "100%", borderRadius: "6px" }}>
        <ChangeView position={position} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} />
      </MapContainer>
    </div>
  );
}

export default Map;