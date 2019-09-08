////////// ANGULAR //////////
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, tap, mergeMap, debounceTime } from 'rxjs/operators';
import { AuthorColaborationsService } from './author-colaborations.service';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'author-colaborations',
  templateUrl: './author-colaborations.component.html',
  styleUrls: ['./author-colaborations.component.scss']
})
export class AuthorColaborationsComponent implements OnInit, OnDestroy {
  filterTextControl = new FormControl('');

  constructor(
    private authorCollaborationsService: AuthorColaborationsService
    ){

  }

  ngOnInit() {
    this.listenSearchbar();
  }


  listenSearchbar(){
    this.filterTextControl.valueChanges
    .pipe(
      filter(filterText => filterText != null),
      debounceTime(250),
      tap(filterText => console.log('Buscar por el author que conicida con  ==> ', filterText)),
      mergeMap(filterText => this.authorCollaborationsService.getArticlesByAuthor$(filterText))
    ).subscribe(results =>  this.showResults(results) )
  }

  showResults(results: any[]): void{
    console.log('Mostrar los sisguientes resultados ==> ', results)
  }

  ngOnDestroy() {
  }
}
