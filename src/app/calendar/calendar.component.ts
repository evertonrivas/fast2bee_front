import { Component,AfterContentInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { TopbarComponent } from '../common/topbar/topbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports:[
    CommonModule,
    RouterModule,
    TopbarComponent,
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterContentInit{

  constructor(private route:Router){
    
  }

  ngAfterContentInit(): void {
    this.route.navigate(["/calendar/gantt"]);
  }

}
