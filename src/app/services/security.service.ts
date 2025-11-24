import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContentType, MyHttp } from './my-http';
import { ResponseError } from '../models/paginate.model';

@Injectable({
  providedIn: 'root'
})
export class SecurityService extends MyHttp{
  constructor(http:HttpClient) { 
    super(http)
  }

  tryAuth(_username:string,_password:string): Observable<any>{
    return this.http.post<any>(this.sys_config.backend_smc+"/users/auth",{
      "username": _username,
      "password": _password
    },{
      headers: this.getHeader(ContentType.json)
    });
  }

  checkLogged():Observable<boolean|ResponseError>{
    return this.http.put<boolean|ResponseError>(this.sys_config.backend_smc+"/users/auth",{
      "token": localStorage.getItem('token_access')
    },{
      headers: this.getHeader(ContentType.json)
    });
  }

  renewSession():Observable<any>{
    return this.http.get<any>(this.sys_config.backend_smc+'/users/auth',{
      headers: this.getHeader(),
      params: new HttpParams().set("id",localStorage.getItem("id_user") as string)
    });
  }

  logoff():Observable<any>{
    return this.http.post<any>(this.sys_config.backend_smc+"/users/logout/"+localStorage.getItem("id_user"),{},{
      headers: this.getHeader()
    });
  }

  /**
   * Realiza o reset do password do usuario para a senha padrão do sistema
   * @param p_id 
   * @returns 
   */
  setNewPassword(p_id:number,pwd:string|null = null):Observable<string|ResponseError>{
    return this.http.put<string|ResponseError>(this.sys_config.backend_smc+'/users/password/',{
      "id": p_id,
      "password": pwd
    },{
      headers:this.getHeader(ContentType.json)
    });
  }

  /**
   * Envia e-mail para o usuário, caso o e-mail exista no banco de dados
   * @param p_email 
   * @returns 
   */
  recoveryPassword(p_email:string):Observable<boolean|ResponseError>{
    return this.http.post<boolean|ResponseError>(this.sys_config.backend_smc+'/users/password/',{
      "email": p_email
    },{
      headers: this.getHeader(ContentType.json)
    });
  }

  /**
   * Obtem o e-mail do usuario do sistema com base no ID
   * @param id 
   * @param id_user 
   * @returns 
   */
  getUsername(id:string,id_user:number):Observable<any>{
    return this.http.patch<any>(this.sys_config.backend_smc+'/users/password/',{
      "id_user": id_user
    },{
      headers: this.getHeader(ContentType.json,id)
    });
  }

  resetPassword(id:string,password:string):Observable<any>{
    return this.http.get<any>(this.sys_config.backend_smc+'/users/password/'+id,{
      headers: this.getHeader()
    });
  }
}
