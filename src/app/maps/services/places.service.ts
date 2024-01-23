import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places.interface';
import { PlacesApiClient } from '../api/placesApiClient';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

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

  constructor(private placesApi: PlacesApiClient) {
    this.getUserLocation();
  }


  getPlacesByQuery(query: string = "") {
    this.placesApi.get<PlacesResponse>(query + '.json', {
      params: {
        proximity: this.userLocation!.join(',')
      }
    })
      .subscribe(resp => {
        console.log(resp.features);

        this.isLoadingPlaces = false;
        this.places = resp.features;

      });
  }

}
