import { Component, OnInit } from '@angular/core';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface CityWeather {
  name: string;
  weather: string;
  status: string[];
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: CityWeather[];
}

interface data {
  name: string;
  temperature: string;
  wind: string;
  humidity: string;
}

@Component({
  selector: 'weather-finder',
  templateUrl: './weatherFinder.component.html',
  styleUrls: ['./weatherFinder.component.scss']
})
export class WeatherFinder implements OnInit {

  exist: boolean;
  town: string = '';
  temperature: string = '';
  wind: string = '';
  humidity: string = '';
  isSunny: boolean;

  ngOnInit(): void {
  }


  private apiurl = "https://jsonmock.hackerrank.com/api/weather?name=";
  constructor(private http: HttpClient) { }


  onTownChange(): void {
    console.log(this.town);
    // let string = this.celsius;
    // let num = parseInt(string) * 9 / 5 + 32;
    // this.fahrenheit = num.toString();

    this.http.get(this.apiurl + this.town).subscribe((filteredResult: any) => {
      console.log(filteredResult);
      if (filteredResult.data.length>0) this.exist = true; else this.exist = false;
      if (this.exist) {
        this.temperature = filteredResult.data[0].weather;
        this.isSunny = +(this.temperature.split(" ")[0])>=20;
        this.humidity = filteredResult.data[0].status[1];
        this.wind = filteredResult.data[0].status[0];
      }
    });
  }
}
