import { Component, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {
  favoritos: any[] | [] = [];
  yearInvalid = false;
  subscriptions: Subscription[] = [];
  constructor(
    private storageService: StorageService, private router: Router, private elementRef: ElementRef
  ) {}
  ngOnInit(): void {
    this.favoritos = this.storageService.getFavoritos();
    const deleteFavoritos =
      this.storageService.deleteFavoritos.subscribe((favorites) => {
        this.favoritos = favorites; 
        this.subscriptions.push(deleteFavoritos);
      });

    const attFavoritos =
      this.storageService.attFavoritos.subscribe((movie) => {
        const index = this.favoritos.findIndex((m) => m.imdbID == movie.imdbID);
        this.favoritos[index] = movie;
        this.subscriptions.push(attFavoritos);
      });

    
  }
  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  removeFilme(filme:any){
    const favorites = this.storageService.getFavoritos();
    const index = favorites.findIndex((f) => f.imdbID === filme.imdbID);
    favorites.splice(index, 1); 
      this.storageService.deleteFavorito(favorites); 
  }
  detalhes(id: string) {
    this.router.navigate(['filme', id])
  }
  retornar() {
    this.router.navigate([''])
  }
}
