import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { AppMenuitemComponent } from './app.menuitem.component';
import { TopbarComponent } from '../common/topbar/topbar.component';


@NgModule({
    imports: [
    CommonModule,
    AdminRoutingModule,
    TopbarComponent,
    AdminComponent,
    AppMenuitemComponent
]
})
export class AdminModule { }
