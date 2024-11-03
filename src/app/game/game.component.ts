import { Component } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { DEFAULT_SIZE } from '../constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    CommonModule,
    BoardComponent, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
  width = new FormControl(DEFAULT_SIZE);
  height = new FormControl(DEFAULT_SIZE);

  gameStarted = false;
  reset = false;
  boardHeight = DEFAULT_SIZE;
  boardWidth = DEFAULT_SIZE;

  startGame() {
    this.boardHeight = this.height.value ?? DEFAULT_SIZE;
    this.boardWidth = this.width.value ?? DEFAULT_SIZE;
    this.gameStarted = true;
  }

  clearBoard() {
    this.gameStarted = false;
    this.reset = true;
  }
}
