import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useMap } from 'react-leaflet/hooks';
import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// TODO fix the default marker not showing
// // Fix the default marker icon issue
// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
//   iconUrl: require('leaflet/dist/images/marker-icon.png').default,
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png').default,
// });

// Leaflet maps are immutable so creating another with TileLayer doesn't work,
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
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "100%", width: "100%", borderRadius: "6px" }}>
        <ChangeView position={position} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;