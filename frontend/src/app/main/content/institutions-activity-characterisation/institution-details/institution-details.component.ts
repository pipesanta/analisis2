////////// ANGULAR //////////
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, tap, mergeMap, debounceTime, merge, map } from 'rxjs/operators';
import { InstitutionsIctivityCharacterisationService } from '../institutions-activity-characterisation.service';
import {Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'inst-characterisation',
  templateUrl: './institution-details.component.html',
  styleUrls: ['./institution-details.component.scss']
})
export class InstitutionDetailsComponent implements OnInit, OnDestroy {

  filterTextControl = new FormControl('');
  resultList = [];
  institutionList = [];

  institutioinInfo = null;

  // chart

  public lineChartData = [
    { data: [] /*[90, 59, 80, 81, 56, 55, 40]*/, label: 'Series A' },
  ];
  public lineChartLabels = []// ['Medicina', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        // {
        //   id: 'y-axis-1',
        //   position: 'right',
        //   gridLines: {
        //     color: 'rgba(255,0,0,0.3)',
        //   },
        //   ticks: {
        //     fontColor: 'red',
        //   }
        // }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective, { read: true }) chart: BaseChartDirective;

  // chart 

  constructor(
    private institutionsIctivityCharacterisationService: InstitutionsIctivityCharacterisationService,
    private router: Router,
    private route: ActivatedRoute 
  ) {

  }

  ngOnInit() {
    this.loadInstitutionData();

    const response = {
      medicina: 34,
      casas: 45,
      hola: 456,
      medicina_en: 34,
      casas_we: 45,
      hola_23: 456
    };

    this.lineChartData[0].label = 'El titulo de la grafica';

    Object.keys(response).forEach(att => {
      this.lineChartLabels.push(att);
      this.lineChartData[0].data.push(response[att]);
    });

    console.log(this.lineChartData);
    console.log(this.lineChartLabels);




  }

  loadInstitutionData(){
    this.route.params
      .pipe(
        map( params => params.id ),
        mergeMap(id => this.institutionsIctivityCharacterisationService.getInstitutionInfo$(id) )
      )
    .subscribe((data: any) => {
        data.name =  data.name || 'Sin nombre';
        data.authors = data.authors || 'No hay autores correspondientes';
        data.topics = data.topics || 'No hay campos de estudio';
        data.articles = data.articles || 'No hay artículos';
        this.institutioinInfo = data;
    });
  }

  ngOnDestroy() {




  }

}
