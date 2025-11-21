import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DevolutionRoutingModule } from './devolution-routing.module';
import { DevolutionComponent } from './devolution.component';

import { TopbarComponent } from '../common/topbar/topbar.component';


@NgModule({
  imports: [
    DevolutionComponent,
    CommonModule,
    DevolutionRoutingModule,
    TopbarComponent
]
})
export class DevolutionModule { }
