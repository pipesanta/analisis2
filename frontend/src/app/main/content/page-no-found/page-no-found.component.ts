////////// ANGULAR //////////
import { Component, OnInit, OnDestroy } from '@angular/core';
//////////// ANGULAR MATERIAL ///////////
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatSnackBar,
  MatDialog
} from '@angular/material';

@Component({
// tslint:disable-next-line: component-selector
  selector: 'page-no-found',
  templateUrl: './page-no-found.component.html',
  styleUrls: ['./page-no-found.component.scss']
})
export class PageNoFoundComponent implements OnInit, OnDestroy {



  type = 'line';
  data = {
    datasets: [
      {
        data: [
          // 10, 20, 30
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
      ],
    }
  ],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        // 'Red',
        // 'Yellow',
        // 'Blue'
    ]
};
  options = {
    responsive: true,
    maintainAspectRatio: false
  };



  ngOnInit() {

    const fielsOfStudy = [ 'medicina', 'medicina', 'medicina','medicina', "biologia", "biologia","biologia","biologia","biologia","biologia",  ]
    fielsOfStudy.forEach(field => {
      console.log("ITEM ==> ", field);
      const filedIndex = this.data.labels.findIndex(label => label === field );
      if(filedIndex !== -1){
        this.data.datasets[0].data[filedIndex] =  this.data.datasets[0].data[filedIndex] + 1;
      }else{
        this.data.datasets[0].data.push(1);
        this.data.labels.push(field);
      }

      console.log(this.data);


    });
  }


  ngOnDestroy() {
  }
}
