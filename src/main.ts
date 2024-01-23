import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Map, MapStyle, config } from '@maptiler/sdk';
import { AppModule } from './app/app.module';


if(!navigator.geolocation){
  alert("Naveegador no soporta la Geolocalización");
  throw new Error("Naveegador no soporta la Geolocalización")
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
