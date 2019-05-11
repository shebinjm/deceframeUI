import { Component, OnInit } from '@angular/core';

import { Event } from '../../model/event';
import { Message } from '../../model/message';
import { User } from '../../model/user';
import { SocketService } from '../../service/socket.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User;
  messages: Event[] = [];
  messageContent: string;
  ioConnection: any;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    // this.ioConnection = this.socketService.onMessage()
    //   .subscribe((data: any) => {
    //     this.messages.push(data.pipe(data => data.map(event => ({eventid: event.eventid, src_ip: event.src_ip,
    //       timestamp:event.timestamp,message:event.message,sensor:event.sensor}))).subscribe(data => console.info(data)));
    //   });

      this.ioConnection = this.socketService.onMessage()
      .subscribe(() => {
        console.log('got message');
      });

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });
      
    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });


  }

  public getNotificationCount(): number {
    
      return this.messages.length;
  }


  // public sendMessage(message: string): void {
  //   if (!message) {
  //     return;
  //   }

  //   this.socketService.send({
  //     content: message;
  //   });
  //   this.messageContent = null;
  // }


  
}
