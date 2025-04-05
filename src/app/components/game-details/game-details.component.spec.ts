import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { CartService } from '../../services/cart.service';
import { Game } from '../../models/game.model';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-game-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.scss']
})
export class GameDetailsComponent implements OnInit {
  game: Game | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        return id ? this.gameService.getGameById(id) : of(null);
      }),
      catchError(() => {
        this.error = 'Failed to load game details';
        return of(null);
      })
    ).subscribe({
      next: (game) => {
        this.game = game;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = 'Error loading game';
      }
    });
  }

  addToCart(): void {
    if (this.game) {
      this.cartService.addToCart(this.game);
    }
  }
}