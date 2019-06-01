import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Event } from '../../model/event';
import { Message } from '../../model/message';
import { User } from '../../model/user';
import { SocketService } from '../../service/socket.service';
import { AuthenticationService } from '../../service/authentication.service';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { FormModalComponent } from '../form-modal/form-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginModalEmail = '23456';
  loginModalPassword = '';

  user: User;
  messages: Event[] = [];
  messageContent: string;
  ioConnection: any;

  constructor(private socketService: SocketService,
    private loginService: AuthenticationService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.initIoConnection();
  }

  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((data: any) => {

        this.messages = data.map((event) => {
          return {
            eventid: event.eventid,
            src_ip: event.src_ip,
            timestamp: event.timestamp,
            message: event.message,
            sensor: event.sensor
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

  openFormModal() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    const modalRef = this.modalService.open(FormModalComponent, ngbModalOptions);

    /*
    We may want to pass an id to the modal-component. This is achieved by adding
    the following line inside the openFormModal method.
    */
    modalRef.componentInstance.id = 10; // should be the id

    /* Notice how we interact with the model via a promise.
    */
    modalRef.result.then((result) => {
      console.log('form result >>');
      console.log(result);

      if (this.loginService.authenticate(result.username, result.password)
      ) {
        //  this.router.navigate(['/'])

      } else {
        console.log('login failed');
      }


    }).catch((error) => {
      console.log('from error >>');
      console.log(error);
    });
  }
  
  performLogout() {
    this.loginService.logOut();
    //   this.router.navigate(['login']);
  }

}
