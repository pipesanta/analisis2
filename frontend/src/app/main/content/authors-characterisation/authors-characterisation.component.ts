////////// ANGULAR //////////
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, tap, mergeMap, debounceTime } from 'rxjs/operators';
import { AuthorsCharacterisationService } from './authors-characterisation.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'authors-characterisation',
  templateUrl: './authors-characterisation.component.html',
  styleUrls: ['./authors-characterisation.component.scss']
})
export class AuthorsCharacterisationComponent implements OnInit, OnDestroy {

  filterTextControl = new FormControl('');
  resultList = [];

  constructor(
    private authorsCharacterisationService: AuthorsCharacterisationService
    
  ) {

  }

  ngOnInit() {
    this.listenSearchbar();    

  }


  listenSearchbar() {
    this.filterTextControl.valueChanges
      .pipe(
        filter((filterText: any) => {
          return filterText != null && filterText !== '';
        }),
        debounceTime(50),
        tap(filterText => console.log('Buscar por el author que conicida con  ==> ', filterText)),
        mergeMap(filterText => this.authorsCharacterisationService.searchAuthors$(filterText))
      )
      .subscribe((results: any) => {
        var data= new Array();
        //this.resultList = results;
        var resultados = JSON.parse(results)
        for(var i = 0; i < resultados.length; i++) {
          var obj = resultados[i].Nombre;
      
          //console.log(obj);
          data.push(obj);
        }
        this.resultList=data;
      }
      
      

      );
  }



  ngOnDestroy() {




  }

 
}
