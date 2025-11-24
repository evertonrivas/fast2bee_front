import { Component,AfterContentInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Auth, SysConfig } from 'src/app/models/auth.model';
import { SecurityService } from 'src/app/services/security.service';
import { MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StyleClassModule } from 'primeng/styleclass';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ResponseError } from 'src/app/models/paginate.model';
import { SysService } from 'src/app/services/sys.service';
import { PopoverModule } from 'primeng/popover';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:true,
  imports:[CheckboxModule,
    ButtonModule,
    InputTextModule,
    StyleClassModule,
    PasswordModule,
    FormsModule,
    ToastModule,
    PopoverModule,
    CommonModule],
  providers: [MessageService]
})
export class LoginComponent implements AfterContentInit{
  @ViewChild('pnlRecovery') pnlRecovery:OverlayPanel|null = null;

  username_value:string = "";
  password_value:string = "";
  remember_value:boolean = false;
  config_loading:boolean = false;
  sended:boolean = false;
  loading:boolean = false;
  use_company_custom:boolean = false;
  company_logo:string = "";
  company_name:string = "";

  app_config:SysConfig = {
    pagination_size: 0,
    email_brevo_api_key: '',
    email_from_name: '',
    email_from_value: '',
    flimv_model: '',
    dashboard_config: '',
    ai_model: '',
    ai_api_key: '',
    company_custom: false,
    company_name: '',
    company_logo: '',
    url_instagram: '',
    url_facebook: '',
    url_linkedin: '',
    max_upload_files: 0,
    max_upload_images: 0,
    use_url_images: false,
    track_orders: false,
    erp_integration: false,
    erp_url: '',
    erp_token: '',
    erp_grant_type: '',
    erp_client_id: '',
    erp_client_secret: '',
    erp_username: '',
    erp_password: '',
    dashboard_color: '',
    dashboard_image: ''
  }

  app_token:Auth = {
    token_access: "",
    token_type: "",
    token_expire: "",
    level_access: "",
    id_user: 0,
    id_profile: 0,
    config: this.app_config
  }

  email_to_recovery:string = "";

  constructor(
    private svc:SysService,
    private route:Router,
    private authService: SecurityService,
    private messageService: MessageService
  ){
    
  }

  ngAfterContentInit(): void {
    this.config_loading = true;
    //limpa o storage antes de usar o sistema
    localStorage.removeItem("pagination_size");
    localStorage.removeItem("email_brevo_api_key");
    localStorage.removeItem("email_from_name");
    localStorage.removeItem("email_from_value");
    localStorage.removeItem("flimv_model");
    localStorage.removeItem("dashboard_config");
    localStorage.removeItem("ai_model");
    localStorage.removeItem("ai_api_key");
    localStorage.removeItem("company_custom");
    localStorage.removeItem("company_name");
    localStorage.removeItem("company_logo");
    localStorage.removeItem("url_instagram");
    localStorage.removeItem("url_facebook");
    localStorage.removeItem("url_linkedin");
    localStorage.removeItem("max_upload_files");
    localStorage.removeItem("max_upload_images");
    localStorage.removeItem("use_url_images");
    localStorage.removeItem("track_orders");
    localStorage.removeItem("erp_integration");
    localStorage.removeItem("erp_url");
    localStorage.removeItem("erp_token");
    localStorage.removeItem("erp_grant_type");
    localStorage.removeItem("erp_client_id");
    localStorage.removeItem("erp_client_secret");
    localStorage.removeItem("erp_username");
    localStorage.removeItem("erp_password");
    localStorage.removeItem("dashboard_image");
    localStorage.removeItem("dashboard_color");

    this.username_value = localStorage.getItem("username") as string;
    this.password_value = localStorage.getItem("password") as string;
    if(localStorage.getItem("username")!=null){
      this.remember_value = true;
    }

    //se houver usuario logado realiza o logoff
    let id = parseInt(String(sessionStorage.getItem("id_user")));
    if(id > 0){
      this.authService.logoff();
    }
  }

  onSubmit():boolean{
    this.sended = this.loading = true;
    if(!this.username_value || !this.password_value){
      this.loading = false;
      return false;
    }

    if(this.remember_value){
      localStorage.setItem('username',this.username_value);
      localStorage.setItem('password',this.password_value);
    }else{
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }

    this.authService.tryAuth(
      this.username_value,
      this.password_value
    ).subscribe({
      next: (data) =>{
        var num:number = data as number;
        var msg:string = "Login ou senha inválidos!";
        this.messageService.clear();
        if (num==0 || num==-1){
          if (num==-1){ msg = "Usuário inexistente ou inativo!"; }
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: msg });
        }else{
          this.app_token = data;
        }
      },
      complete: () => {
        //salva as informacoes do token para verificacao
        localStorage.setItem('token_access',this.app_token.token_access);
        localStorage.setItem('token_type',this.app_token.token_type);
        localStorage.setItem('token_expire',this.app_token.token_expire);

        localStorage.setItem('id_user',String(this.app_token.id_user));
        localStorage.setItem('id_profile',String(this.app_token.id_profile));
        localStorage.setItem("level_access",String(this.app_token.level_access));
        localStorage.setItem("message_renew","1");

        // configuracoes para essa conta
        localStorage.setItem("pagination_size",String(this.app_token.config.pagination_size));
        localStorage.setItem("email_brevo_api_key",String(this.app_token.config.email_brevo_api_key));
        localStorage.setItem("email_from_name",String(this.app_token.config.email_from_name));
        localStorage.setItem("email_from_value",String(this.app_token.config.email_from_value));
        localStorage.setItem("flimv_model",this.app_token.config.flimv_model);
        localStorage.setItem("dashboard_config",String(this.app_token.config.dashboard_config));
        localStorage.setItem("ai_model",String(this.app_token.config.ai_model));
        localStorage.setItem("ai_api_key",String(this.app_token.config.ai_api_key));
        localStorage.setItem("company_custom",String(this.app_token.config.company_custom?1:0));
        localStorage.setItem("company_name",this.app_token.config.company_name);
        localStorage.setItem("company_logo",this.app_token.config.company_logo);
        localStorage.setItem("url_instagram",this.app_token.config.url_instagram);
        localStorage.setItem("url_facebook",this.app_token.config.url_facebook);
        localStorage.setItem("url_linkedin",this.app_token.config.url_linkedin);
        localStorage.setItem("max_upload_files",String(this.app_token.config.max_upload_files));
        localStorage.setItem("max_upload_images",String(this.app_token.config.max_upload_images));
        localStorage.setItem("use_url_images",String(this.app_token.config.use_url_images?1:0));
        localStorage.setItem("track_orders",String(this.app_token.config.track_orders?1:0));
        localStorage.setItem("erp_integration",String(this.app_token.config.erp_integration?1:0));
        localStorage.setItem("erp_url",String(this.app_token.config.erp_url));
        localStorage.setItem("erp_token",String(this.app_token.config.erp_token));
        localStorage.setItem("erp_grant_type",String(this.app_token.config.erp_grant_type));
        localStorage.setItem("erp_client_id",String(this.app_token.config.erp_client_id));
        localStorage.setItem("erp_client_secret",String(this.app_token.config.erp_client_secret));
        localStorage.setItem("erp_username",String(this.app_token.config.erp_username));
        localStorage.setItem("erp_password",String(this.app_token.config.erp_password));
        localStorage.setItem("dashboard_color",String(this.app_token.config.dashboard_color));
        localStorage.setItem("dashboard_image",String(this.app_token.config.dashboard_image));

        this.use_company_custom = this.app_token.config.company_custom;
        this.company_logo = this.app_token.config.company_logo;
        this.company_name = this.app_token.config.company_name;

        switch(this.app_token.level_access){
          case "A": this.route.navigate(["/admin"]); break;
          case "L": this.route.navigate(["/salesforce"]); break;
          case "I": this.route.navigate(["/salesforce"]); break;
          case "R": this.route.navigate(["/representative"]); break;
        }
        this.loading = false;
      },
      error: (err: Error) => {
        this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Ocorreu um erro ao tentar logar!' });
        this.loading = false;
      }
    })

    return true;
  }

  onRecovery():void{
    this.sended = true;

    if(this.email_to_recovery.trim().length==0 && this.email_to_recovery.indexOf("@")==-1){
      return;
    }

    this.authService.recoveryPassword(this.email_to_recovery).subscribe({
      next:(data) =>{
        this.pnlRecovery?.hide();
        this.email_to_recovery = "";
        this.sended = false;
        if(typeof data ==='boolean'){
          this.messageService.add({ 
            severity: 'success', 
            summary: 'Sucesso!', 
            detail: "Caso seu usuário esteja ativo ou exista em nosso banco de dados, você receberá um e-mail com as instruções!" });
        }else{
          this.messageService.add({
            severity:'error',
            summary:'Erro ao tentar enviar o e-mail!',
            detail: (data as ResponseError).error_details
          });
        }
      }
    });
  }
}
