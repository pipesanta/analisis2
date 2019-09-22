import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { DatePipe } from '@angular/common';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';

import { ChartsModule } from 'ng2-charts';
import { InstitutionsActivityCharacterisationComponent } from './institutions-activity-characterisation.component';
import { InstitutionsIctivityCharacterisationService } from './institutions-activity-characterisation.service';

const routes: Routes = [
  {
    path: '',
    component: InstitutionsActivityCharacterisationComponent,
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
    InstitutionsActivityCharacterisationComponent    
  ],
  providers: [ InstitutionsIctivityCharacterisationService, DatePipe]
})

export class InstitutionsActivityCharacterisationModule {}