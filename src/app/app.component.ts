import { Component, OnInit } from '@angular/core';
import { APIService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  show: any;
  seasons: any[] = [];
  episodes: any[] = [];
  selectedEpisode: any = null;

  // periodistas
  cast: any[] = [];

  // PERSON INFO
  personInfo: any = null;

  // buscador
  searchText: string = '';

  // filtro temporada
  selectedSeason: number = 0;

  // favoritos
  favorites: any[] = [];

  constructor(private apiService: APIService) { }

  ngOnInit(): void {

    this.apiService.getNFLToday().subscribe((data: any) => {

      this.show = data;
      this.seasons = data._embedded?.seasons || [];
      this.episodes = data._embedded?.episodes || [];

    });

    // traer periodistas
    this.apiService.getCast().subscribe((data: any[]) => {
      this.cast = data;
    });

    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
    }
  }

  get filteredEpisodes() {

    const text = this.searchText.toLowerCase();

    return this.episodes.filter(ep => {

      const name = (ep.name || '').toLowerCase();

      const summary = (ep.summary || '')
        .replace(/<[^>]*>/g, '') // elimina etiquetas HTML
        .toLowerCase();

      const matchText =
        name.includes(text) ||
        summary.includes(text);

      const matchSeason =
        this.selectedSeason === 0 ||
        ep.season === this.selectedSeason;

      return matchText && matchSeason;

    });

  }

  addFavorite(episode: any) {
    const exists = this.favorites.find(fav => fav.id === episode.id);
    if (!exists) {
      this.favorites.push(episode);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }

  removeFavorite(id: number) {
    this.favorites = this.favorites.filter(fav => fav.id !== id);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  isFavorite(id: number) {
    return this.favorites.some(fav => fav.id === id);
  }

  toggleFavorite(episode: any) {
    if (this.isFavorite(episode.id)) {
      this.removeFavorite(episode.id);
    } else {
      this.addFavorite(episode);
    }
  }

  getEpisodesCount(seasonNumber: number): number {
    return this.episodes.filter(e => e.season === seasonNumber).length;
  }

  viewDetail(ep: any) {
    this.selectedEpisode = ep;
  }

  closeDetail() {
    this.selectedEpisode = null;
  }

  // CLICK EN PERIODISTA
  viewCastDetail(person: any) {

    const id = person.person.id;

    this.apiService.getPersonInfo(id).subscribe((data: any) => {
      this.personInfo = data;
    });

  }

  closePersonDetail() {
    this.personInfo = null;
  }

  getAge(birthday: string): string {

    if (!birthday) return "Sin registro";

    const birthDate = new Date(birthday);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age.toString();
  }

}