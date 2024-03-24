import { Component } from '@angular/core';
import { FilmeService } from 'src/app/service/filme.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  filmes: any[] = [];
  nomeFilme: string = '';
  error: any;

  constructor(private service: FilmeService, private router: Router,private storageService: StorageService) { }

  pesquisarFilme() {
    this.service.serviceFilme(this.nomeFilme).subscribe(
      (dados => {
        this.filmes = dados.Search;
        this.error = dados.Error;
        
        if (this.error === "Muitos Resultados.") {
          this.error += "Digite mais informações";
        }
  
        const favorites = this.storageService.getFavoritos();
        if (favorites.length > 0) {
          this.filmes.forEach(filme => {
            const isFavorite = favorites.some(favorite => favorite.imdbID === filme.imdbID);
            filme.isFilled = isFavorite;
          });
        }
      })
    );
  }

  detalhes(id: string) {
    this.router.navigate(['filme', id])
  }
  addFavoritos(filme:any){
    const favorites = this.storageService.getFavoritos();
    filme.isFilled = !filme.isFilled;
    const index = favorites.findIndex((f) => f.imdbID === filme.imdbID);
    if (index !== -1) {
      favorites.splice(index, 1); 
      this.storageService.deleteFavorito(favorites); 
    } else {
      this.storageService.addFavorito(filme);
    }
    }

    gotofavoritos(){
      this.router.navigate(['favoritos'])
      
    }
}
