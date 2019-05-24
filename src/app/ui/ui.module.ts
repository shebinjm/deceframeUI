import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatTreeModule, MatIconModule, MatButtonModule } from '@angular/material';
import { NavigationComponent } from './navigation/navigation.component';
import { SecondComponent } from './second/second.component';
import { FirstComponent } from './first/first.component';
import {RouterModule, Routes} from "@angular/router";
import {CustomMaterialModule} from "../core/material.module";
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import  {AuthGaurdService} from '../service/auth-gaurd.service';
import { FormsModule } from '@angular/forms';


const appRoutes: Routes = [
  { path: '', component: FirstComponent, data: { title: 'First Component' } },
  { path: 'first', component: FirstComponent, data: { title: 'First Component' } ,canActivate:[AuthGaurdService]},
  { path: 'second', component: SecondComponent, data: { title: 'Second Component' },canActivate:[AuthGaurdService]},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
];

@NgModule({
  declarations: [NavigationComponent,SecondComponent,
    FirstComponent,LayoutComponent, HeaderComponent, FooterComponent, LoginComponent, LogoutComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true } // <-- debugging purposes only
    ),
    CustomMaterialModule
  ],
  exports: [LayoutComponent]
})
export class UiModule {}