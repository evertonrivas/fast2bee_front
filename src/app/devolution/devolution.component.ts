import { AfterViewInit, Component } from '@angular/core';
import { Common } from '../classes/common';
import { Router, RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../common/topbar/topbar.component';

@Component({
  selector: 'app-devolution',
  standalone: true,
  imports:[
    TopbarComponent,
    RouterOutlet
  ],
  templateUrl: './devolution.component.html',
  styleUrls: ['./devolution.component.scss']
})
export class DevolutionComponent extends Common implements AfterViewInit{
  constructor(route:Router){
    super(route)
  }

  ngAfterViewInit(): void {
    this.route.navigate([this.modulePath+"/process"]);
  }
}
