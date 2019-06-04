import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

export class DeceEvent{
  constructor(
    public event:string,
    public sensor:string,
    public timestamp:string,
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class DececlientService {

  constructor( private httpClient:HttpClient
  ) { 
     }

     getDeceEvents()
  {
    let username='deceframe'
    let password='admin123'
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    
    return this.httpClient.get<DeceEvent[]>('http://localhost:8080/deceframe/decEvents');
  }
}
