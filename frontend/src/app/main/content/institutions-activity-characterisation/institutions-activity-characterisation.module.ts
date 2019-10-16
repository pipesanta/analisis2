import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { DatePipe } from '@angular/common';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';

import { ChartsModule } from 'ng2-charts';
import { InstitutionsActivityCharacterisationComponent } from './institutions-activity-characterisation.component';
import { InstitutionsIctivityCharacterisationService } from './institutions-activity-characterisation.service';
import { InstitutionDetailsComponent } from './institution-details/institution-details.component';
import { FieldsDetailsComponent } from './fields-study/fields-study.component';

const routes: Routes = [
  {
    path: '',
    component: InstitutionsActivityCharacterisationComponent,
  },  
  {
    path: 'detail/:id',
    component: InstitutionDetailsComponent,
  },
  {
    path: 'field-detail/:id',
    component: FieldsDetailsComponent
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
    InstitutionsActivityCharacterisationComponent, InstitutionDetailsComponent, FieldsDetailsComponent
  ],
  providers: [ InstitutionsIctivityCharacterisationService, DatePipe]
})

export class InstitutionsActivityCharacterisationModule {}