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



  // chart 01


  doughnutChartLabels = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  doughnutChartData =  [
    [350, 450, 100],
    [50, 150, 120],
    [250, 130, 70],
  ];
  doughnutChartType: ChartType = 'doughnut';

  // chart 01

  // char 02


  // Pie
  public pieChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  // public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


  // chart02









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
        mergeMap(filterText => this.authorCollaborationsService.getArticlesByAuthor$(filterText))
      )
      .subscribe((results : any[]) => {
        console.log("##########################");
        console.log(results);

        
        this.articleList = results
          .map(item => ({
            name: item.title,
            fields_of_study: item.fieldsOfStudy,
            mainAuthor: { name: item.author.name, lastName : item.author.surname },
            authorsColab: item.collaborators.map(i => ({ name: i.name, lastName: i.surname }) )
          }));
          

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
