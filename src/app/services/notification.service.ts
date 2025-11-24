import { Injectable, isDevMode } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { environment as sys_config } from "src/environments/environment";
import { environment as sys_config_dev } from "src/environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  sys_config = isDevMode()?sys_config_dev:sys_config;
  private socket: WebSocketSubject<any>;
  constructor() { 
    this.socket = webSocket(sys_config.backend_ntf);
  }

  listenForNotification(): Observable<any>{
    return this.socket.asObservable();
  }

  sendMessage(message:any):void{
    this.socket.next(message);
  }
}
