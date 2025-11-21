import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-event',
  standalone: true,
  imports:[
    CommonModule,
    TooltipModule
  ],
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @Input() ComponentSize:number = 0;
  @Input() ComponentColor:string = "";
  @Input() ComponentCollection:string | null = null;
  @Input() ComponentBrand:string|null = null;
  @Input() ComponentDateStart:string|null = null;
  @Input() ComponentDateEnd: string|null = null;
  @Input() isMilestone:boolean = false;
  constructor(){}
}
