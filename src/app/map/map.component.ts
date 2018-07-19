import { Component, OnInit } from '@angular/core';
//import { icon, latLng, Layer, Map, imageOverlay, latLngBounds, Marker, marker, point, popup, tileLayer, polygon } from 'leaflet';
import * as L from 'leaflet'
import 'leaflet-imageoverlay-rotated'

import { MapService } from '../map.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private service: MapService) {}

  // Define our base layers so we can reference them multiple times
  streetMaps = L.tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    maxZoom: 28,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  bounds = L.latLngBounds([
    L.latLng(-23.577569, -46.720602),
    L.latLng(-23.577733, -46.720557),
    L.latLng(-23.577655, -46.720250),
    L.latLng(-23.577492, -46.720303)
  ])
  houseLayer = L.imageOverlay('https://br.habcdn.com/photos/project/big/desenho-basico_675740.jpg', this.bounds);


  topleft = L.latLng(-23.577569, -46.720602);
  bottomleft = L.latLng(-23.577733, -46.720557);
  topright = L.latLng(-23.577492, -46.720303);
  houseRotated = L.imageOverlay.rotated('https://br.habcdn.com/photos/project/big/desenho-basico_675740.jpg', this.topleft, this.topright, this.bottomleft);

  polygonArea = [[-23.577569, -46.720602],
    [-23.577733, -46.720557],
    [-23.577655, -46.720250],
    [-23.577492, -46.720303]
  ];
  area = L.polygon(this.polygonArea as [number, number][], {
    color: 'red',
    weight: 1
  });

  drones: L.Layer[];
  layers: L.Layer[] = [ this.streetMaps, this.houseRotated ];


  ngOnInit(): void {
    this.putThingsOnMap();
  }

  putThingsOnMap(): void {
    this.service.getThings().subscribe(things => this.drones = things);
    for(let thing of this.drones) {
      this.layers.push(thing)
    }
    this.layers.push(this.area)
  }

  clickDrone() {
    for(let drone of this.drones) {
      drone.on('click', () => drone.openPopup());
    }
  }

  options = {
    layers: this.layers,
    zoom: 19,
    center: L.latLng([ -23.577609, -46.720393 ])
  };
}
