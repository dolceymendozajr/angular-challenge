import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  URL: string =
    'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
  APIKEY: string = '63d348fe2f13e88053cba3c88ee60cd1';

  constructor(private http: HttpClient) {}

  getCityWeather(city: string) {
    return this.http.get(this.URL + city + '&appid=' + this.APIKEY);
  }
}
