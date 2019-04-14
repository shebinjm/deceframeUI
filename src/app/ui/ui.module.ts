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


const appRoutes: Routes = [
  { path: '', component: FirstComponent, data: { title: 'First Component' } },
  { path: 'first', component: FirstComponent, data: { title: 'First Component' } },
  { path: 'second', component: SecondComponent, data: { title: 'Second Component' } }
];

@NgModule({
  declarations: [NavigationComponent,SecondComponent,
    FirstComponent,LayoutComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    BrowserModule,
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