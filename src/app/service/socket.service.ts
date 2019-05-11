import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Message } from '../model/message';
import { Event } from '../model/event';

import * as socketIo from 'socket.io-client';
import { AnonymousSubject } from 'rxjs/internal/Subject';

const SERVER_URL = 'http://localhost:5000';

@Injectable({
    providedIn: 'root'
  })
export class SocketService {
    private socket;

    public initSocket(): void {
        this.socket = socketIo(SERVER_URL);
    }

    public send(message: Message): void {
        this.socket.emit('my response', message);
    }

    public onMessage(): Observable<any> {
        console.log("message got 13");
        return new Observable<any>(observer => {
            this.socket.on('message', (data: any) => {
                console.log("got some data", data);
                observer.next(data)});
        
        });
    }AnonymousSubject

    public onEvent(event: Event): Observable<any> {
        console.log("message got 14");
        return new Observable<Event>(observer => {
            console.log("got some event");
            this.socket.on(event, () => observer.next());
        });
    }
}