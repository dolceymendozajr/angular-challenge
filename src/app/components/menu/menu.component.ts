import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherService } from 'src/app/weather.service';
import CITIES from 'src/app/cities';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public cities = CITIES;

  @Output('getCity') addCity = new EventEmitter();

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {}

  filterByName(query: string) {
    return this.cities.filter(function (city) {
      return city.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  }

  searchCity(citySearch: string) {
    this.cities = this.filterByName(citySearch);
  }

  selectCity(index: number) {
    const city = this.cities[index];
    this.weatherService.getCityWeather(city.name).subscribe((data) => {
      this.addCity.emit(data);
    });
  }
}
