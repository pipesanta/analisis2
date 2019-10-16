import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { DatePipe } from '@angular/common';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';

import { ChartsModule } from 'ng2-charts';
import { JournalsCharacterisationComponent } from './journals-characterisation.component';
import { JournalsCharacterisationService } from './journals-characterisation.service';

const routes: Routes = [
  {
    path: '',
    component: JournalsCharacterisationComponent,
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
    JournalsCharacterisationComponent    
  ],
  providers: [ JournalsCharacterisationService, DatePipe]
})

export class JournalsCharacterisationModule {}