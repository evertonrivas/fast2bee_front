import { AfterContentInit, Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../common/topbar/topbar.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports:[TopbarComponent,RouterOutlet],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements AfterContentInit{
  constructor(private route:Router){
    
  }
  
  ngAfterContentInit(): void {
    this.route.navigate(["/orders/management"]);
    // this.route.navigate(["/crm/reports"]);
  }
}
