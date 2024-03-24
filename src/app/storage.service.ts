import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorageService {
  favorites: any[] = [];

  deleteFavoritos = new Subject<any[]>();
  attFavoritos = new Subject<any>();


  addFavorito(movie: any) {
    const favorites = this.getFavoritos();
    const favoriteDuplicate = favorites.find((m) => m.imdbID === movie.imdbID);
    if (favoriteDuplicate) {
    } else {
      this.favorites = this.getFavoritos();
      this.favorites.push(movie);
      const favoritesString = JSON.stringify(this.favorites);
      localStorage.setItem('favoritos', favoritesString);
    }
  }
  getFavoritos(): any[] | [] {
    const favoritesString = localStorage.getItem('favoritos');
    return favoritesString ? JSON.parse(favoritesString) : [];
  }

  deleteFavorito(movie: any) {
    const moviesAfterDelete = movie;
    localStorage.setItem('favoritos', JSON.stringify(moviesAfterDelete));
    this.deleteFavoritos.next(this.getFavoritos());
  }
 
}


