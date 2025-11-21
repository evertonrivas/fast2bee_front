import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';

import { TopbarComponent } from '../common/topbar/topbar.component';


@NgModule({
  imports: [
    OrdersComponent,
    CommonModule,
    TopbarComponent,
    OrdersRoutingModule
]
})
export class OrdersModule { }
