import L from 'leaflet'

//icon base (default)
const defaultIcon = L.icon({
    iconUrl: '/pin-azul.png',
    iconSize: [25, 41], // Size of the icon
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34],
})

//icon hover (highlighted)
const highlightedIcon = L.icon({
    iconUrl: '/pin-rojo.png', // Replace with the path to your highlighted marker icon
    iconSize: [27, 45], // Size of the icon (slightly larger for highlight)
    iconAnchor: [15, 48], // Adjust anchor point accordingly
    popupAnchor: [1, -34],
  });

  const selectedIcon = new L.Icon({
    iconUrl: '/pin-rosa01.png',
    iconSize: [35, 51],
    iconAnchor: [17, 51],
    popupAnchor: [1, -34],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null
  });

  export { defaultIcon, highlightedIcon, selectedIcon };