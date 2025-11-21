import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';

import { FieldFilter } from '../../models/field.model';
import { FieldType } from '../../models/system.enum';
import { SysService } from 'src/app/services/sys.service';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    SidebarModule,
    CommonModule,
    InputNumberModule,
    CalendarModule,
    SelectModule,
    FormsModule,
    MultiSelectModule,
    RadioButtonModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent{
  @Input() visible:boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() queryToFilter = new EventEmitter<string>();
  @Input() fields!:FieldFilter[];
  @Input() isTrash:boolean = false;
  fieldType = FieldType;
  constructor(
    private svc:SysService,
    private cdr:ChangeDetectorRef){
  }

  doFilter():void{
    let filter:string = "";
    this.fields.forEach((f)=>{
      if (f.value!=undefined){
        if(typeof f.value ==='boolean'){
          filter += f.filter_prefix+":"+f.filter_name+" "+(f.value==true?"1":"0")+"||";
        }else{
          filter += f.filter_prefix+":"+f.filter_name+" "+f.value+"||";
        }
      }
    });
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.queryToFilter.emit(filter+(this.isTrash==true?"trash 1||":""));
    this.cdr.detectChanges();
  }

  onDateChanged():void{

  }

  clearFilter(announce:boolean = true):void{
    this.fields.forEach((f) =>{
      f.value = undefined;
    });
    this.visible = false;
    this.visibleChange.emit(this.visible);
    if(announce!=false)
      this.queryToFilter.emit("");
  }
}
