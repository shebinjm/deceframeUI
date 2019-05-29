import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SecondComponent } from './second/second.component';
import { FirstComponent } from './first/first.component';
import {RouterModule, Routes} from "@angular/router";
import  {AuthGaurdService} from '../service/auth-gaurd.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


const appRoutes: Routes = [
  { path: '', component: FirstComponent, data: { title: 'First Component' } },
  { path: 'first', component: FirstComponent, data: { title: 'First Component' } ,canActivate:[AuthGaurdService]},
  { path: 'second', component: SecondComponent, data: { title: 'Second Component' },canActivate:[AuthGaurdService]},
  ];

@NgModule({
  declarations: [NavigationComponent,SecondComponent,
    FirstComponent,LayoutComponent, HeaderComponent, FooterComponent,LoginModalComponent  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    
    RouterModule.forRoot(
      appRoutes,
      { useHash: true } // <-- debugging purposes only
    ),
    
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  exports: [LayoutComponent],
  entryComponents: [
    LoginModalComponent
  ]
})
export class UiModule {}