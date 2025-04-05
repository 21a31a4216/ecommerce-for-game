import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from '../../models/game.model';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {
  @Input() game!: Game;

  constructor(
    private cartService: CartService,
    private router: Router
  ) {}

  addToCart(event: Event): void {
    event.stopPropagation();
    this.cartService.addToCart(this.game);
  }

  redirectToInstall(): void {
    if (this.game.installUrl) {
      window.open(this.game.installUrl, '_blank');
    } else {
      this.router.navigate(['/games', this.game.id]);
    }
  }
}