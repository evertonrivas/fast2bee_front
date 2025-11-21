import { CommonModule } from '@angular/common';
import { Component,AfterContentInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../common/topbar/topbar.component';

@Component({
  selector: 'app-crm',
  standalone: true,
  imports:[
    CommonModule,
    TopbarComponent,
    RouterOutlet
  ],
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss']
})
export class CrmComponent implements AfterContentInit {
  constructor(private route:Router){
    
  }
  
  ngAfterContentInit(): void {
    this.route.navigate(["/crm/kanban"]);
    // this.route.navigate(["/crm/reports"]);
  }
}
