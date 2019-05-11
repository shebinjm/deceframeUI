import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirstComponent } from '../first/first.component';
import { SecondComponent } from '../second/second.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit{
  
constructor(private router: Router,) {
   
}

  ngOnInit() {

  }

}
