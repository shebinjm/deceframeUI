import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Event } from '../../model/event';
import { Message } from '../../model/message';
import { User } from '../../model/user';
import { SocketService } from '../../service/socket.service';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  loginFormModalEmail = new FormControl('Your email', Validators.email);
  loginFormModalPassword = new FormControl('', Validators.required);
  invalidLogin = false
  user: User;
  messages: Event[] = [];
  messageContent: string;
  ioConnection: any;

  constructor(private socketService: SocketService,
    private loginService:AuthenticationService,private router: Router,
    ) { }

  ngOnInit() {
    this.initIoConnection();
  }

  checkLogin() {
    if (this.loginService.authenticate(this.loginFormModalEmail, this.loginFormModalPassword)
    ) {
      this.router.navigate([''])
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }

  performLogout() {
    this.loginService.logOut();
    this.router.navigate(['login']);
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((data: any) => {
        
        this.messages = data.map( (event) => {            
            return {
            eventid: event.eventid, 
            src_ip: event.src_ip,
            timestamp:event.timestamp,
            message:event.message,
            sensor:event.sensor
          }
                              });
                console.log(this.messages);              
        // this.messages.push(data.pipe(data => data.map(event => ({eventid: event.eventid, src_ip: event.src_ip,
        //   timestamp:event.timestamp,message:event.message,sensor:event.sensor}))).subscribe(data => console.info(data)));
      
      
        });

    

    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected 1');
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
