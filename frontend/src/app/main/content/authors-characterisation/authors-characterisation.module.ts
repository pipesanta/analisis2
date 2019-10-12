import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { DatePipe } from '@angular/common';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';

import { ChartsModule } from 'ng2-charts';
import { AuthorsCharacterisationComponent } from './authors-characterisation.component';
import { AuthorsCharacterisationService } from './authors-characterisation.service';
import { InstitutionDetailsComponent } from './institution-details/institution-details.component';

const routes: Routes = [
  {
    path: '',
    component: AuthorsCharacterisationComponent,
  },
  {
    path: 'detail',
    component: InstitutionDetailsComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    FuseWidgetModule,
    ChartsModule
  ],
  declarations: [
    AuthorsCharacterisationComponent, InstitutionDetailsComponent
  ],
  providers: [ AuthorsCharacterisationService, DatePipe]
})

export class AuthorsCharacterisationModule {}
