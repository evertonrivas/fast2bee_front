import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CrmRoutingModule } from './crm-routing.module';
import { CrmComponent } from './crm.component';

import { KanbanComponent } from './kanban/kanban.component';
import { CustomerDataComponent } from './kanban/customer-data/customer-data.component';
import { CustomerFileComponent } from './kanban/customer-file/customer-file.component';
import { CustomerEmailComponent } from './kanban/customer-email/customer-email.component';
import { CustomerHistoryComponent } from './kanban/customer-history/customer-history.component';
import { provideNgxMask } from 'ngx-mask';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { DragDropModule } from 'primeng/dragdrop';
import { TabViewModule } from 'primeng/tabview';
import { TextareaModule } from 'primeng/textarea';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { EditorModule } from 'primeng/editor';
import { TopbarComponent } from '../common/topbar/topbar.component';
import { ChipModule } from 'primeng/chip';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ToolbarModule } from 'primeng/toolbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  imports: [
    CrmComponent,
    CustomerEmailComponent,
    CustomerDataComponent,
    CommonModule,
    CrmRoutingModule,
    CardModule,
    MenuModule,
    SplitButtonModule,
    ProgressBarModule,
    DividerModule,
    BadgeModule,
    DragDropModule,
    TabViewModule,
    TextareaModule,
    FileUploadModule,
    AutoCompleteModule,
    EditorModule,
    TopbarComponent,
    ChipModule,
    IconFieldModule,
    InputIconModule,
    ToolbarModule,
    ProgressSpinnerModule
],
  providers:[
    provideNgxMask()
  ]
})
export class CrmModule { }
