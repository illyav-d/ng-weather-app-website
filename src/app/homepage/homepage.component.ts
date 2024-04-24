import { Component } from '@angular/core';
import { WeatherService } from '../weather/weather.service';
import { Weather } from '../weather/weather.model';
import { CommonModule } from '@angular/common';
import { WeatherCondition } from '../weather/weathercondition/weather-condition';
import { Day } from '../day/day.model';
import { GeolocationService } from '../geolocation/geolocation.service';
import { ReverseGeolocationService } from '../geolocation/reverse-geolocation.service';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  //Fields
  weather!: Weather
  city!: string


  //Dictionairies 
  weatherCodeConditions: WeatherCondition[] = [
    { code: 0, description: "Clear sky", img: "../../assets/icons/clearsky.png" },
    { code: 1, description: "Mainly clear", img: "../../assets/icons/weather-partly-cloudy.png" },
    { code: 2, description: "Partly cloudy", img: "../../assets/icons/weather-partly-cloudy.png" },
    { code: 3, description: "Overcast", img: "../../assets/icons/overcast.png" },
    { code: 45, description: "Fog and depositing rime fog", img: "../../assets/icons/weather-fog.png" },
    { code: 48, description: "Fog and depositing rime fog", img: "../../assets/icons/weather-fog.png" },
    { code: 51, description: "Drizzle: Light intensity", img: "../../assets/icons/drizzle.png" },
    { code: 53, description: "Drizzle: Moderate intensity", img: "../../assets/icons/drizzle.png" },
    { code: 55, description: "Drizzle: Dense intensity", img: "../../assets/icons/drizzle.png" },
    { code: 56, description: "Freezing Drizzle: Light intensity", img: "../../assets/icons/weather-snowy-rainy.png" },
    { code: 57, description: "Freezing Drizzle: Dense intensity", img: "../../assets/icons/weather-snowy-rainy.png" },
    { code: 61, description: "Rain: Slight intensity", img: "../../assets/icons/rainpour.png" },
    { code: 63, description: "Rain: Moderate intensity", img: "../../assets/icons/rainpour.png" },
    { code: 65, description: "Rain: Heavy intensity", img: "../../assets/icons/rainpour.png" },
    { code: 66, description: "Freezing Rain: Light intensity", img: "../../assets/icons/weather-snowy-rainy.png" },
    { code: 67, description: "Freezing Rain: Heavy intensity", img: "../../assets/icons/weather-snowy-rainy.png" },
    { code: 71, description: "Snow fall: Slight intensity", img: "../../assets/icons/weather-snowy.png" },
    { code: 73, description: "Snow fall: Moderate intensity", img: "../../assets/icons/weather-snowy.png" },
    { code: 75, description: "Snow fall: Heavy intensity", img: "../../assets/icons/weather-snowy-heavy.png" },
    { code: 77, description: "Snow grains", img: "../../assets/icons/weather-snowy-rainy.png" },
    { code: 80, description: "Rain showers: Slight intensity", img: "../../assets/icons/rainpour.png" },
    { code: 81, description: "Rain showers: Moderate intensity", img: "../../assets/icons/rainpour.png" },
    { code: 82, description: "Rain showers: Violent intensity", img: "../../assets/icons/rainpour.png" },
    { code: 85, description: "Snow showers: Slight intensity", img: "../../assets/icons/weather-snowy.png" },
    { code: 86, description: "Snow showers: Heavy intensity", img: "../../assets/icons/weather-snowy-heavy.png" },
    { code: 95, description: "Thunderstorm: Slight or moderate", img: "../../assets/icons/weather-lightning.png" },
    { code: 96, description: "Thunderstorm with slight hail", img: "../../assets/icons/thunder-hail.png" },
    { code: 99, description: "Thunderstorm with heavy hail", img: "../../assets/icons/thunder-hail.png" }
  ];
  days: Array<Day> = [
    {
      code: 0,
      day: "Sunday"
    },
    {
      code: 1,
      day: "Monday"
    },
    {
      code: 2,
      day: "Tuesday"
    },
    {
      code: 3,
      day: "Wednesday"
    },
    {
      code: 4,
      day: "Thursday"
    },
    {
      code: 5,
      day: "Friday"
    },
    {
      code: 6,
      day: "Saturday"
    }


  ]

  //Constr
  constructor(private weatherService: WeatherService, private geolocationService: GeolocationService, private reverseGeolocationService: ReverseGeolocationService) {
    this.getGeoLocation();
  }

  //Methods
  retrieveWeatherDataWithParams(latitude: number, longitude: number) {
    this.weatherService.retrieveWeatherDataWithParams(latitude, longitude).subscribe((response: any) => this.weather = response)
  }
  reverseGeolocation(latitude: number, longitude: number) {
    this.reverseGeolocationService.reverseGeolocation(latitude, longitude).subscribe((response: any) => {
      this.city = response.address.town;

    })
  }
  getWeatherImgByCode(number: Number) {
    return this.weatherCodeConditions.find(condition => condition.code === number)?.img;
  }
  getWeatherDescriptionByCode(number: Number) {
    return this.weatherCodeConditions.find(condition => condition.code === number)?.description;
  }
  parseStringToDate(string: string): Date {
    let dateString: string = string;
    let dateObject: Date = new Date(dateString);
    return dateObject;
  }
  getDayByCode(number: Number) {
    return this.days.find(condition => condition.code === number)?.day;
  }
  getGeoLocation() {
    this.geolocationService.getCurrentPosition().subscribe({
      next: (position) => {
        this.retrieveWeatherDataWithParams(position.coords.latitude, position.coords.longitude);
        this.reverseGeolocation(position.coords.latitude, position.coords.longitude);
      },
      error: (error) => {
        console.error('Error getting geolocation:', error);
      },
    });
  }
}


