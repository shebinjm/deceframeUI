import { Component,OnInit } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import {DececlientService,DeceEvent} from '../../service/dececlient.service';
import { Router } from '@angular/router';

export class DeceEventNode {
  children: DeceEventNode[];
  nodeName: string;
  public event:string;
  public sensor:string;
  public timestamp:string;
}

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent implements OnInit {

  mychildren: DeceEventNode[];
  deceEvents:DeceEvent[];
  title = 'eventTree';
  nestedTreeControl: NestedTreeControl<DeceEventNode>;
  nestedDataSource: MatTreeNestedDataSource<DeceEventNode>;
  dataChange: BehaviorSubject<DeceEventNode[]> = new BehaviorSubject<DeceEventNode[]>([]);

  constructor(private router: Router,
    private dececlientService: DececlientService) {
    
    this.nestedTreeControl = new NestedTreeControl<DeceEventNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    this.dataChange.subscribe(data => this.nestedDataSource.data = data);

    this.dataChange.next([
      {
        nodeName:"127.0.0.1",
        event :"",
        sensor:"",
        timestamp:"",
        children:[]
      }
    ]);

    this.dataChange.next([
      {
        nodeName:"127.0.0.1",
        event :"xxx",
        sensor:"",
        timestamp:"",
        children: [
          {
            nodeName:"127.0.0.2",
        event :"yyy",
        sensor:"",
        timestamp:"",
        children:[],
          }
        ],
      },
      {
        nodeName:"127.0.0.3",
        event :"zzz",
        sensor:"",
        timestamp:"",
        children:[],
      },
    ]);

    // this.dataChange.next(this.mychildren);
  }

  ngOnInit() {
    this.dececlientService.getDeceEvents().subscribe(
     response =>this.handleSuccessfulResponse(response),
    );
  }

handleSuccessfulResponse(response)
{
 // this .deceEvents=response.json();
 //let d = response.json();
  console.log("result = " + response);
  //console.log("url = " + d.image_url);      
  // for(let deceEvent of this.deceEvents){
    
  //   this.mychildren[]=
  // }
   // this.mychildren=response;

  //  this.mychildren=(response => response.map(event => ({nodeName: '127.0.0.3',
  //   timestamp:event.timestamp,event:event.event,sensor:event.sensor})));
  //   console.log("result = " + this.mychildren);
  }


  private _getChildren = (node: DeceEventNode) => { return observableOf(node.children); };
  
  hasNestedChild = (_: number, nodeData: DeceEventNode) => {return !(nodeData.sensor); };
}



