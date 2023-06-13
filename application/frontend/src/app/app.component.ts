import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/organisms/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="container">
      <div class="container--inner">
        <div class="container--inner navbar">
          <app-navbar></app-navbar>
        </div>
      </div>
    </div>
  `,
  styles: [''],
  imports: [CommonModule, RouterOutlet, NavbarComponent]
})
export class AppComponent {}
