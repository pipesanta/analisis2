import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../../core/modules/shared.module';
import { DatePipe } from '@angular/common';
import { FuseWidgetModule } from '../../../core/components/widget/widget.module';

import { AuthorColaborationsComponent } from './author-colaborations.component';
import { AuthorColaborationsService } from './author-colaborations.service';

const routes: Routes = [
  {
    path: '',
    component: AuthorColaborationsComponent,
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    FuseWidgetModule
  ],
  declarations: [
    AuthorColaborationsComponent    
  ],
  providers: [ AuthorColaborationsService, DatePipe]
})

export class AuthorCollaborationsModule {}