import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places.interface';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {

  public selectedId: string = "";

  constructor(
    private placesService: PlacesService,
    private mapService: MapService,
    ){}

  get isLoadingPlaces(){
    return this.placesService.isLoadingPlaces;
  }

  get places(){
    return this.placesService.places;
  }

  flyTo(place: Feature){

    this.selectedId = place.id;

    const[lng, lat] = place.center;
    this.mapService.flyTo([lng,lat]);
  }

}
