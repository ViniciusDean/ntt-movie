import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './gallery/Pesquisa/search.component';
import { MovieComponent } from './gallery/Filmes/movie.component';
import { FavoritosComponent } from './gallery/favoritos/favoritos.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'filme/:id', component: MovieComponent },
  {path: 'favoritos', component: FavoritosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
