import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    PasswordModule,
    ToastModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    CommonModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  providers:[MessageService]
})
export class ResetPasswordComponent {
  loading:boolean = false;
  sended: boolean = false;
  idb64:string = '';
  id: number = 0;
  username: string = '';
  password: string = '';
  cpassword: string = '';

  constructor(
    private router:Router,
    private msg:MessageService,
    private svc:SecurityService
  ){
      let url_parts = this.router.url.substring(1,this.router.url.length).split("/")
      this.idb64 = url_parts[1] as string;
      this.id = parseInt(url_parts[2].toString());
  }

  ngAfterViewInit():void{
    this.svc.getUsername(this.idb64, this.id).subscribe({
      next: (data) =>{
        this.username = data.email as string;
      }
    });
  }

  onSubmit(){
    this.sended = true;
    if(this.password.trim().length==0 || this.cpassword.length==0 || this.password!=this.cpassword){
      return;
    }

    this.loading = true;
    this.svc.setNewPassword(this.id,this.password).subscribe({
      next: (data) =>{
        if(typeof data === 'boolean'){
          this.sended = false;
          this.loading = false;
          this.msg.clear();
          if (data == true){
            this.msg.add({
              severity: 'success',
              summary: 'Senha redefinida!',
              detail: 'Sua senha foi redefinida com sucesso'
            });
          }else{
            this.msg.add({
              severity:'error',
              summary: 'Erro ao redefinir!',
              detail: 'Ocorreu um erro ao tentar redefinir sua senha'
            });
          }
        }
      }
    });
  }

  goToHome(){
    document.location.href="/";
  }
}
