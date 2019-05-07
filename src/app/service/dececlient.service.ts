import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    return this.httpClient.get<DeceEvent[]>('http://localhost:8080/deceframe/decEvents');
  }
}
