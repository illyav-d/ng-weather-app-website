import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weather } from './weather.model';
import { Observable } from 'rxjs';
import { GeolocationService } from '../geolocation/geolocation.service';
import { ReverseGeolocationService } from '../geolocation/reverse-geolocation.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  city!: string

  constructor(private httpClient: HttpClient) {
  }

  retrieveWeatherDataWithParams(latitude: number, longitude: number): Observable<any> {
    return this.httpClient.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
  }
}
