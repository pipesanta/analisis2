import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { DatePipe } from '@angular/common';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';

import { ChartsModule } from 'ng2-charts';
import { JournalsCollaborationComponent } from './journals-collaboration.component';
import { JournalsCollaborationService } from './journals-collaboration.service';

const routes: Routes = [
  {
    path: '',
    component: JournalsCollaborationComponent,
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
    JournalsCollaborationComponent
  ],
  providers: [ JournalsCollaborationService, DatePipe]
})

export class JournalsCollaborationModule {}
