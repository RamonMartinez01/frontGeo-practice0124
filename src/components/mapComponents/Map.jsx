import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { defaultIcon, highlightedIcon, selectedIcon } from '../../utils/markerIcons';

const Map = ({ escuelas, selectedMarker, setSelectedMarker }) => {
  const [hoveredMarker, setHoveredMarker] = useState(null);

  const handleMarkerMouseOver = (index) => {
    setHoveredMarker(index);
  };

  const handleMarkerMouseOut = () => {
    setHoveredMarker(null);
  };

  const handleMarkerClick = (index) => {
    setSelectedMarker((selectedMarker) => (
      selectedMarker === index ? null : index
    ));
  };


  return (
    <MapContainer 
      center={[19.3097083754, -99.1042744648]} 
      zoom={11} 
      style={{ height: '700px', width: '100%' }}
      scrollWheelZoom={false}  
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {escuelas.map((escuela, index) => (
        <Marker 
          key={escuela.id}
          position={[escuela.Latitud, escuela.Longitud]}
          icon={
            index === selectedMarker ? selectedIcon 
            : (index === hoveredMarker ? highlightedIcon : defaultIcon)
          }
          eventHandlers={{
            mouseover: () => handleMarkerMouseOver(index),
            mouseout: handleMarkerMouseOut,
            click: () => handleMarkerClick(index),
          }}  
      >
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