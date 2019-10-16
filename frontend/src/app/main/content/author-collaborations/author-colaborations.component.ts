////////// ANGULAR //////////
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, tap, mergeMap, debounceTime, map } from 'rxjs/operators';
import { AuthorColaborationsService } from './author-colaborations.service';

import { ChartType, ChartOptions } from 'chart.js';

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

  showLegend =  true;



  // chart 01


  doughnutChartLabels = [];
  doughnutChartData =  [ [ ] ];
  doughnutChartType = 'doughnut';

  // chart 01

  // char 02


  // Pie
  // public pieChartOptions = {
  //   responsive: true,
  //   legend: {
  //     position: 'top',
  //   },
  //   plugins: {
  //     datalabels: {
  //       formatter: (value, ctx) => {
  //         const label = ctx.chart.data.labels[ctx.dataIndex];
  //         return label;
  //       },
  //     },
  //   }
  // };
  // public pieChartLabels = [];
  // public pieChartData= [];
  // public pieChartType = 'pie';
  // public pieChartLegend = true;
  // // public pieChartPlugins = [pluginDataLabels];
  // public pieChartColors = [
  //   {
  //     backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
  //   },
  // ];


  constructor(
    private authorCollaborationsService: AuthorColaborationsService
  ) {

  }

  ngOnInit() {  

    this.listenSearchbar(); // inicia el escuchador observador




  }

   // events
  chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }


  listenSearchbar() {
    this.filterTextControl.valueChanges
      .pipe(
        filter((filterText: any) => {
          return filterText != null && filterText !== ''
        }),
        debounceTime(500),
        tap(filterText => console.log('Buscar por el author que conicida con  ==> ', filterText)),
        mergeMap(filterText => this.authorCollaborationsService.getArticlesByAuthor$(filterText)),
        filter((list: any) => list.length > 0)
      )
      .subscribe((results : any[]) => {
        console.log("##########################");
        console.log(results);

        // this.doughnutChartLabels = [];
        // this.doughnutChartData = [ [] ];

        const allFields = [];
        const fieldsMap = {};


        
        this.articleList = results
          .map(item => {
            allFields.push(...item.fieldsOfStudy)
            return ({
              name: item.title,
              fields_of_study: item.fieldsOfStudy.join(", "),
              mainAuthor: { name: item.author.name, lastName : item.author.surname },
              authorsColab: item.collaborators.map(i => ({ name: i.name, lastName: i.surname }) )
            })
          });

        allFields.forEach(item => {
          if(!fieldsMap[item]){
            fieldsMap[item] = 1;
          }else{
            fieldsMap[item]++;
          }
        });


        allFields.forEach(item => {
          if(!fieldsMap[item]){
            fieldsMap[item] = 1
          }else{
            fieldsMap[item] = fieldsMap[item] + 1;
          }
        });

        console.log(fieldsMap);
        const labels = [];
        const dataValues = [];

        Object.keys(fieldsMap)
          .forEach(key => {
            labels.push(key);
            dataValues.push(fieldsMap[key]);
          });


        this.doughnutChartLabels = labels;
        this.doughnutChartData[0] = dataValues;

        this.showLegend = this.doughnutChartLabels.length < 15;






      });
  }

  showResults(results: any[]): void {
    console.log('Mostrar los sisguientes resultados ==> ', results);



  }

  ngOnDestroy() {




  }
}
