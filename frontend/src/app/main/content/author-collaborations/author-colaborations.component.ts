////////// ANGULAR //////////
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, tap, mergeMap, debounceTime, map } from 'rxjs/operators';
import { AuthorColaborationsService } from './author-colaborations.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'author-colaborations',
  templateUrl: './author-colaborations.component.html',
  styleUrls: ['./author-colaborations.component.scss']
})
export class AuthorColaborationsComponent implements OnInit, OnDestroy {

  filterTextControl = new FormControl('');
  resultList = [];
  articleList = [];



  // chart


  // chart


  constructor(
    private authorCollaborationsService: AuthorColaborationsService
  ) {

  }

  ngOnInit() {
    this.listenSearchbar(); // inicia el escuchador observador
  }


  listenSearchbar() {
    this.filterTextControl.valueChanges
      .pipe(
        filter((filterText: any) => {
          return filterText != null && filterText !== ''
        }),
        debounceTime(500),
        tap(filterText => console.log('Buscar por el author que conicida con  ==> ', filterText)),
        mergeMap(filterText => this.authorCollaborationsService.getArticlesByAuthor$(filterText))
      )
      .subscribe((results : any[]) => {
        console.log("##########################");
        console.log(results);

        /*
        this.articleList = results
          .map(item => ({
            name: item.title,
            fields_of_study: item.fields_of_study.map(i => i.name).join(" "),
            mainAuthor: { name: item.authors[0].first_name, lastName : item.authors[0].last_name },
            authorsColab: item.authors.slice(1).map(i => ({ name: i.first_name, lastName: i.last_name }) )
          }));
          */

        //   console.log(this.articleList);
      }


      );
  }

  showResults(results: any[]): void {
    console.log('Mostrar los sisguientes resultados ==> ', results);



  }

  ngOnDestroy() {




  }
}
