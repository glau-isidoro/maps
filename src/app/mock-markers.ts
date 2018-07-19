import { Layer, Marker, marker, icon, popup } from 'leaflet';

export const THINGS: Layer[] = [
  marker([ -23.577600, -46.720568 ], {
    icon: icon({
      iconSize: [ 40, 20 ],
      iconUrl: '../assets/images/DroneCamera-512.png'
    })
  }).bindPopup(popup().setContent(
    '<p>First Drone<br/> This drone is flying high!'
  )),
  marker([ -23.577599, -46.720451 ], {
    icon: icon({
      iconSize: [ 40, 20 ],
      iconUrl: '../assets/images/DroneCamera-512.png'
    })
  }).bindPopup(popup().setContent(
    '<p>Second Drone<br/> This drone isn\'t flying.'
  ))
];
