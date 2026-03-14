import { Component, OnInit } from '@angular/core';
import { APIService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  // corregido
})
export class AppComponent implements OnInit {

  show: any;
  seasons: any[] = [];
  episodes: any[] = [];
  selectedEpisode: any = null;

  // buscador
  searchText: string = '';

  // filtro temporada
  selectedSeason: number = 0;

  // favoritos
  favorites: any[] = [];

  constructor(private apiService: APIService) { }

  ngOnInit(): void {
    // consumo de API
    this.apiService.getNFLToday().subscribe((data: any) => {

      this.show = data;

      // temporadas
      this.seasons = data._embedded?.seasons || [];

      // episodios
      if (data._embedded?.episodes) {
        this.episodes = data._embedded.episodes;
      } else {
        this.episodes = [];
      }

    });

    // cargar favoritos guardados
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      this.favorites = JSON.parse(savedFavorites);
    }
  }

  // agregar favorito
  addFavorite(episode: any) {
    const exists = this.favorites.find(fav => fav.id === episode.id);
    if (!exists) {
      this.favorites.push(episode);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }

  // eliminar favorito
  removeFavorite(id: number) {
    this.favorites = this.favorites.filter(fav => fav.id !== id);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  // verificar si es favorito
  isFavorite(id: number) {
    return this.favorites.some(fav => fav.id === id);
  }

  // toggle favorito: agrega o quita
  toggleFavorite(episode: any) {
    if (this.isFavorite(episode.id)) {
      this.removeFavorite(episode.id);
    } else {
      this.addFavorite(episode);
    }
  }

  // contador de episodios por temporada
  getEpisodesCount(seasonNumber: number): number {
    return this.episodes.filter(e => e.season === seasonNumber).length;
  }

  viewDetail(ep: any) {
    this.selectedEpisode = ep;
  }

  closeDetail() {
    this.selectedEpisode = null;
  }
}

