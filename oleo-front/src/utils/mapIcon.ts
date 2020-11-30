import Leaflet from 'leaflet'

import mapMarkerImg from '../images/marcacao.png'

const mapIcon = Leaflet.icon({
	iconUrl: mapMarkerImg,
    iconSize: [28, 38],
    iconAnchor: [14, 38],
    popupAnchor: [0, -60]
})

export default mapIcon