import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';


@Component({
  selector: 'app-auto-order',
  standalone: true,
  imports: [
    PanelModule,
    ButtonModule,
    
  ],
  templateUrl: './auto-order.component.html',
  styleUrls: ['./auto-order.component.scss']
})
export class AutoOrderComponent {

}
