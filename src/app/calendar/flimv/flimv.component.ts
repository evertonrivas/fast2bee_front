import { NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { Common } from 'src/app/classes/common';

import { CommercialRule } from 'src/app/models/commercial-rule.model';
import { CustomerCurve } from 'src/app/models/system.enum';
import { CalendarService } from 'src/app/services/calendar.service';

@Component({
  selector: 'app-flimv',
  standalone: true,
  imports:[
      FormsModule,
      ToastModule,
      ConfirmDialogModule,
      PanelModule,
      OverlayPanelModule,
      ButtonModule,
      TableModule,
      ToggleButtonModule,
      PaginatorModule,
      NgIf
  ],
  templateUrl: './flimv.component.html',
  styleUrls: ['./flimv.component.scss'],
  providers:[MessageService]
})
export class FlimvComponent extends Common implements AfterViewInit{
  rules:CommercialRule[] = [];
  curves = CustomerCurve;

  constructor(route:Router,
    private cdr:ChangeDetectorRef,
    private svc:CalendarService,
    private msg:MessageService){
    super(route);
  }

  ngAfterViewInit(): void {
    this.svc.listFlimv().subscribe({
      next:(data) =>{
        if (typeof data === 'object' && (data as CommercialRule[]).length>0){
          this.rules = data as CommercialRule[];
        }else{
          for(let i=5;i>0;i--){
            let rule:CommercialRule = {
              id: (i),
              frequency: 0,
              liquidity: 0,
              injury: 0,
              mix: 0,
              volume: [0]
            }
            this.rules.push(rule);
          }
        }
      }
    });
    this.cdr.detectChanges();
  }

  save():void{
    this.svc.saveFlimv(this.rules).subscribe({
      next:(data) =>{
        this.msg.clear();
        if((data as boolean)==true){
          this.msg.add({ severity:'success', summary:'Sucesso!',detail:'Regras salvas com sucesso!'});
        }else{
          this.msg.add({severity:'error',summary:'Erro!',detail:'Ocorreu um erro ao tentar salvar as regras!'});
        }
      }
    });
  }
}
