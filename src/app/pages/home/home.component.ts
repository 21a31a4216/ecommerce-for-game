// home.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameCardComponent } from '../../components/game-card/game-card.component';
import { GameService } from '../../services/game.service';
import { Observable, of } from 'rxjs';
import { Game } from '../../models/game.model';
import { AsyncPipe } from '@angular/common';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, GameCardComponent, AsyncPipe, SearchComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  games$: Observable<Game[]>;

  constructor(private gameService: GameService) {
    this.games$ = this.gameService.getGames();
  }

  onSearch(searchTerm: string): void {
    if (searchTerm.trim() === '') {
      this.games$ = this.gameService.getGames();
    } else {
      this.games$ = this.gameService.getGames(searchTerm);
    }
  }
}