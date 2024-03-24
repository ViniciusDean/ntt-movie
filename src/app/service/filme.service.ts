import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmeService { 

  private api_url = 'https://omdbapi.com/?apikey';
  private api_key = '54d8780';

  constructor(private http: HttpClient) { }

  serviceFilme(nome: string): Observable<any> {
    return this.http.get(`${this.api_url}=${this.api_key}&s=${nome}`);
  }

  pesquisaID(id: string): Observable<any> {
    return this.http.get(`${this.api_url}=${this.api_key}&i=${id}`);
  }
}
