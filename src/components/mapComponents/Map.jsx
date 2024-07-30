import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const Map = ({ escuelas }) => {
  return (
    <MapContainer center={[19.3097083754, -99.1042744648]} zoom={11} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {escuelas.map((escuela) => (
        <Marker key={escuela.id} position={[escuela.Latitud, escuela.Longitud]}>
          <Popup>
            <strong>{escuela.Nombre}</strong>
            <br />
            {escuela.Domicilio}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;