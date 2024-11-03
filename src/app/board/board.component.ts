import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { DEFAULT_SIZE, DIRECTIONS } from '../constants';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() boardWidth: number = DEFAULT_SIZE;
  @Input() boardHeight: number = DEFAULT_SIZE;
  @Input() reset = false;

  board: boolean[][] = [];
  private subscription?: Subscription;

  constructor() {}

  ngOnInit() {
    this.initializeState();

    this.subscription = interval(1000).subscribe(() => {
      this.nextState(); // Generate new state every 1 second
    });
  }

  ngOnChanges(): void {
    if (this.reset) {
      this.initializeState();
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Clean up the subscription
    }
  }
  
  shouldFill(i: number, j: number) {
    return this.board[i][j];
  }

  initializeState() {
    let row: boolean[];
    const initialState: boolean[][] = [];

    for (let i = 0; i < this.boardHeight; ++i) {
      row = [];

      for (let j = 0; j < this.boardWidth; ++j) {
        row.push(Boolean(Math.round(Math.random())));
      }

      initialState.push(row);
    }

    this.board = initialState;
  }

  nextState() {
    let row: boolean[];
    const newState: boolean[][] = [];

    for (let i = 0; i < this.boardHeight; ++i) {
      row = [];

      for (let j = 0; j < this.boardWidth; ++j) {
        const liveNeighboursCount = this.getLiveNeighboursCount(i, j);

        // If cell is alive
        if (this.board[i][j]) {
          // If the condition is met, the cell lives.
          // Otherwise, the cell dies.
          row.push(liveNeighboursCount === 2 || liveNeighboursCount === 3)
        } else {
          // If the cell is dead:
          // If the condition is met, the cell becomes alive.
          // Otherwise, the cell stays dead.
          row.push(liveNeighboursCount === 3)
        }
      }

      newState.push(row);
    }

    this.board = newState;
  }

  getLiveNeighboursCount(i: number, j: number) {
    let liveCount = 0;

    DIRECTIONS.forEach(({ row, col }) => {
      const newRow = i + row;
      const newCol = j + col;

      if (
        newRow >= 0 &&
        newRow < this.boardHeight &&
        newCol >= 0 &&
        newCol < this.boardWidth &&
        this.board[newRow][newCol]
      ) {
        ++liveCount;
      }
    });

    return liveCount;
  }
}
