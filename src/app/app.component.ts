import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { GameComponent } from './game/game.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent, 
    GameComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
