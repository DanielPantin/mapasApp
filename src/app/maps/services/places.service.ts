import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  constructor(
    private placesApi: PlacesApiClient,
    private mapService: MapService,
    ) {
    this.getUserLocation();
  }

  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }

  getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude];
        },
        (err) => {
          alert("No se pudo obtener la geolocalizacion"),
            console.log(err);
          reject();
        }
      );
    })
  }

  getPlacesByQuery(query: string = "") {

    if(query.length === 0){
      this.isLoadingPlaces = false;
      this.places = [];
      return;
    }

    this.placesApi.get<PlacesResponse>(query + '.json', {
      params: {
        proximity: this.userLocation!.join(',')
      }
    })
      .subscribe(resp => {
        this.isLoadingPlaces = false;
        this.places = resp.features;
        this.mapService.createMarkersFromPlaces(this.places, this.userLocation!);
      });
  }

}
