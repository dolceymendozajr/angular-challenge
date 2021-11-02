import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherService } from 'src/app/weather.service';
import { Weather } from 'src/app/interfaces/weather/weather.interface';

@Component({
  selector: 'weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss'],
})
export class WeatherCardComponent implements OnInit {
  @Input() weather: Weather = { name: '', main: { temp: 0 } };

  tempMag: string = 'C';
  weatherName: string = '';

  @Output('deleteCity') deleteCity = new EventEmitter();

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.setweatherName();
  }

  update() {
    this.weatherService
      .getCityWeather(this.weather.name)
      .subscribe((data: any) => {
        this.weather = data;
        this.tempMag = 'C';
        this.setweatherName();
      });
  }

  convertTemp(to: string) {
    let currentTemp = this.weather.main.temp;
    let newTemp = 0;
    switch (to) {
      case 'C':
        newTemp =
          this.tempMag == 'F'
            ? (5 / 9) * (currentTemp - 32)
            : this.tempMag == 'K'
            ? currentTemp - 273
            : currentTemp;
        break;

      case 'F':
        newTemp =
          this.tempMag == 'C'
            ? 1.8 * currentTemp + 32
            : this.tempMag == 'K'
            ? (currentTemp - 273) * (9 / 5) + 32
            : currentTemp;

        break;

      case 'K':
        newTemp =
          this.tempMag == 'F'
            ? (5 / 9) * (currentTemp - 32) + 273
            : this.tempMag == 'C'
            ? 273 + currentTemp
            : currentTemp;

        break;
    }

    this.tempMag = to;
    this.weather.main.temp = newTemp;
  }

  setweatherName() {
    const currentTemp = this.weather.main.temp;
    const tempCelsius =
      this.tempMag == 'F'
        ? (5 / 9) * (currentTemp - 32)
        : this.tempMag == 'K'
        ? currentTemp - 273
        : currentTemp;
    console.log(tempCelsius);
    if (tempCelsius < 19) {
      this.weatherName = 'cold';
    } else if (tempCelsius > 19 && tempCelsius < 26.1) {
      this.weatherName = 'warm';
    } else {
      this.weatherName = 'hot';
    }
  }

  delete() {
    this.deleteCity.emit(this.weather.name);
  }
}
