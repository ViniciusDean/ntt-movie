import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmeService } from 'src/app/service/filme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  id_filme: string = '';
  filme: any;

  constructor(private service: FilmeService, private routerActivate: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id_filme = this.routerActivate.snapshot.params['id'];

    this.service.pesquisaID(this.id_filme).subscribe(
      (dados => {
        this.filme = dados;

      })
    );
  }

  retornar() {
    this.router.navigate([''])
  }
}
