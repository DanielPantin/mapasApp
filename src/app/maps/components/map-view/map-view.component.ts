import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, MapStyle, config, Popup, Marker } from '@maptiler/sdk';

import '@maptiler/sdk/dist/maptiler-sdk.css';
import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map: Map | undefined;

  constructor(
    private placesService: PlacesService,
    private mapService: MapService,
    ) { }

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    config.apiKey = 'OSUwj0L2WRMVLuQUgGoG';
  }

  ngAfterViewInit() {

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS,
      center: this.placesService.userLocation,
      zoom: 14,
      geolocateControl: false,
      scaleControl: false,
      navigationControl: false,

    });

    const popup = new Popup()
    .setHTML(`
      <h6>Aquí estoy</h6>
      <span>Estoy en este lugar del mundo</span>
    `);

    new Marker({color: 'red'})
    .setLngLat(this.placesService.userLocation!)
    .setPopup(popup)
    .addTo(this.map)

    this.mapService.setMap(this.map);

  }

  ngOnDestroy() {
    this.map?.remove();
  }
}
