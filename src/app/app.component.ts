import { Component } from '@angular/core';
import { Weather } from './interfaces/weather/weather.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  citiesWeather: Weather[] = [];

  title = 'angular-challenge';

  setCity(cityWeather: any) {
    this.citiesWeather.push(cityWeather);
  }

  removeCity(city: any) {
    const cityIndex = this.citiesWeather.findIndex(
      (cityWeather) => cityWeather.name.toLowerCase() == city.toLowerCase()
    );
    this.citiesWeather.splice(cityIndex, 1);
  }
}
