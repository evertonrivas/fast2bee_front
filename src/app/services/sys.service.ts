import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Filter } from '../models/filter.model';
import { ContentType, MyHttp } from './my-http';
import { MyPlan, TenantConfig } from '../models/auth.model';
import { ResponseError } from '../models/paginate.model';
import { Cep } from '../models/entity.model';

@Injectable({
  providedIn: 'root'
})
export class SysService extends MyHttp{
  private filterB2bAnnounced = new Subject<Filter>();

  filterB2bAnnounced$ = this.filterB2bAnnounced.asObservable();

  constructor(http:HttpClient) { 
    super(http);
  }

  announceB2bFilter(filters:Filter){
    this.filterB2bAnnounced.next(filters);
    return;
  }

  getConfig(profile:string):Observable<TenantConfig|ResponseError>{
    return this.http.get<TenantConfig|ResponseError>(this.sys_config.backend_smc+'/config/'+profile,{
      headers:this.getHeader()
    });
  }

  saveConfig(cfg:TenantConfig):Observable<boolean|ResponseError>{
    return this.http.post<boolean|ResponseError>(this.sys_config.backend_cmm+'/config/',cfg,{
      headers: this.getHeader(ContentType.json)
    });
  }

  getPostalCode(txt:string):Observable<Cep|ResponseError>{
    return this.http.post<Cep|ResponseError>(this.sys_config.backend_cmm+'/integration/',{
      "postal_code": txt
    },{
      headers: this.getHeader(ContentType.json)
    })
  }

  improvementAI(txt:string,helpType:string):Observable<any|ResponseError>{
    return this.http.post<string|ResponseError>(this.sys_config.backend_cmm+'/ai/',{
      "text": txt,
      "type": helpType
    },{
      headers: this.getHeader(ContentType.json)
    })
  }

  getPlan():Observable<MyPlan|ResponseError>{
    return this.http.get<MyPlan|ResponseError>(this.sys_config.backend_smc+'/plan/my-plan/',{
      headers: this.getHeader()
    })
  }

  // list(opt:Options):Observable<TablePrice[]|RequestResponse|ResponseError>{
  //   return this.http.get<TablePrice[]|RequestResponse|ResponseError>(this.sys_config.backend_b2b+'/price-table/',{
  //     headers: this.getHeader(),
  //     params: this.getParams(opt)
  //   });
  // }
}
