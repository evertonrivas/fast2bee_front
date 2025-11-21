import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PanelModule } from 'primeng/panel';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone:true,
  imports:[
    PanelModule
  ],
  providers:[
    MessageService
  ]
})
export class ProfileComponent {

}
