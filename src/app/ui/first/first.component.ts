import { Component,OnInit,ViewEncapsulation,ViewChild,ElementRef } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import {DececlientService,DeceEvent} from '../../service/dececlient.service';
import { Router } from '@angular/router';
import * as d3 from 'd3';



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
  styleUrls: ['./first.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FirstComponent implements OnInit {
  @ViewChild('chart')
  private chartContainer: ElementRef;

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
    this.createTree();
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

  createTree(){
    var treeData =
  {
    "name": "Top Level",
    "children": [
      { 
        "name": "Level 2: A",
        "children": [
          { "name": "Son of A" },
          { "name": "Daughter of A" }
        ]
      },
      { "name": "Level 2: B" }
    ]
  };

  const element = this.chartContainer.nativeElement;

// Set the dimensions and margins of the diagram
var margin = {top: 20, right: 90, bottom: 30, left: 90},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select(element).append('svg')
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate("
          + margin.left + "," + margin.top + ")");

          // var svg = d3.select(element).append('svg')
          // .attr('width', element.offsetWidth)
          // .attr('height', element.offsetHeight);

var i = 0,
    duration = 750,
    root;

// declares a tree layout and assigns the size
var treemap = d3.tree().size([height, width]);

// Assigns parent, children, height, depth
root = d3.hierarchy(treeData, function(d:any) { return d.children; });
root.x0 = height / 2;
root.y0 = 0;

// Collapse after the second level
root.children.forEach(collapse);

update(root);

// Collapse the node and all it's children
function collapse(d) {
  if(d.children) {
    d._children = d.children
    d._children.forEach(collapse)
    d.children = null
  }
}

function update(source) {

  // Assigns the x and y position for the nodes
  var treeData = treemap(root);

  // Compute the new tree layout.
  var nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

  // Normalize for fixed-depth.
  nodes.forEach(function(d){ d.y = d.depth * 180});

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.node')
      .data(nodes, function(d:any) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

  // Add Circle for the nodes
  nodeEnter.append('circle')
        .attr("r", 2.5)
        .attr("fill", (d:any) => d._children ? "#555" : "#999")
        .attr("stroke-width", 10);
      

  // Add labels for the nodes
  nodeEnter.append('text')
      .attr("dy", "0.31em")
        .attr("x", (d:any)=> d._children ? -6 : 6)
        .attr("text-anchor", (d:any) => d._children ? "end" : "start")
        .text((d:any) => d.data.name)
      .clone(true).lower()
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "white");

  // UPDATE
  //var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeEnter.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeEnter.select('circle.node')
    .attr('r', 10)
    .style("fill", function(d:any) {
        return d._children ? "lightsteelblue" : "#fff";
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.link')
      .data(links, function(d:any) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
 // var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkEnter.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y}
        return diagonal(o, o)
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d:any){
    d.x0 = d.x;
    d.y0 = d.y;
  });

  // Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    var path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path
  }

  

  // Toggle children on click.
  function click(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
    update(d);
  }
}
  }


}



