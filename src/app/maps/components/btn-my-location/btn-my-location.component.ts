import { Component } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import { MapService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.css'
})
export class BtnMyLocationComponent {

  constructor(
    private placesService: PlacesService,
    private mapService: MapService,
    ){

  }

  goToMyLocation(){
    if(!this.placesService.isUserLocationReady) return;
    if(!this.mapService.isMapReady) return;
    this.mapService.flyTo(this.placesService.userLocation!);
  }

}
