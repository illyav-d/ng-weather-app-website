import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReverseGeolocationService {

  constructor(private httpClient: HttpClient) { }

  reverseGeolocation(latitude: number, longitude: number) {
    return this.httpClient.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
  }
}
