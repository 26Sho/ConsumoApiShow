import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '../interface/api';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  url: string;

  constructor(private http: HttpClient) {
    this.url = 'https://api.tvmaze.com/shows/32242?embed[]=seasons&embed[]=episodes';
  }

  getNFLToday() {
    return this.http.get<API>(this.url);
  }

  getCast() {
    return this.http.get<any[]>('https://api.tvmaze.com/shows/32242/cast');
  }

  // NUEVO: traer información completa de la persona
  getPersonInfo(id: number) {
    return this.http.get<any>(`https://api.tvmaze.com/people/${id}`);
  }

  searchSSeries(query: string) {
    return this.http.get<any[]>(`https://api.tvmaze.com/search/shows?q=${query}`);
  }

  getSerieById(id: number) {
    return this.http.get<API>(`https://api.tvmaze.com/shows/${id}`);
  }
}