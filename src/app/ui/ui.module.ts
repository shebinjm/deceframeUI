import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatTreeModule, MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
  ],
  exports: [LayoutComponent]
})
export class UiModule {}