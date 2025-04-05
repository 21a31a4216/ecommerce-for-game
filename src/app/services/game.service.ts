import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'https://api.rawg.io/api/games';
  private apiKey = 'YOUR_RAWG_API_KEY';

  constructor(private http: HttpClient) {}

  // Add this method
  getGameById(id: string): Observable<Game> {
    return this.http.get<any>(`${this.apiUrl}/${id}?key=${this.apiKey}`).pipe(
      map(game => this.transformGameData(game)),
      catchError(() => of(this.createEmptyGame()))
    );
  }

  // Add this method
  private transformGameData(apiGame: any): Game {
    return {
      id: apiGame.id.toString(),
      title: apiGame.name,
      price: Math.floor(Math.random() * 50) + 10 - 0.01,
      imageUrl: apiGame.background_image || 'assets/images/no-image.jpg',
      rating: apiGame.rating,
      platforms: apiGame.platforms?.map((p: any) => p.platform.name) || ['Unknown'],
      releaseDate: apiGame.released,
      description: apiGame.description_raw,
      installUrl: `https://store.example.com/install/${apiGame.id}`
    };
  }

  // Add this method if not present
  private createEmptyGame(): Game {
    return {
      id: '0',
      title: 'Game Not Found',
      price: 0,
      imageUrl: 'assets/images/no-image.jpg',
      rating: 0,
      platforms: ['Unknown'],
      installUrl: '#'
    };
  }

  // Rest of your existing methods...
  getGames(searchTerm?: string): Observable<Game[]> {
    if (searchTerm && searchTerm.trim() !== '') {
      return this.http.get<any>(`${this.apiUrl}?key=${this.apiKey}&search=${searchTerm}&page_size=12`).pipe(
        map(response => response.results.map((game: any) => this.transformGameData(game))),
        catchError(() => of(this.getFallbackGames(searchTerm)))
      );
    } else {
      return this.http.get<any>(`${this.apiUrl}?key=${this.apiKey}&page_size=12`).pipe(
        map(response => response.results.map((game: any) => this.transformGameData(game))),
        catchError(() => of(this.getFallbackGames()))
      );
    }
  }

  private getFallbackGames(searchTerm?: string): Game[] {
    const fallbackGames = [
      {
        id: '1',
        title: 'Minecraft',
        price: 29.99,
        imageUrl: 'https://image.api.playstation.com/vulcan/ap/rnd/202407/0401/670c294ded3baf4fa11068db2ec6758c63f7daeb266a35a1.png',
        rating: 4.9,
        platforms: ['PC', 'Mobile'],
        installUrl: 'https://play.google.com/store/apps/details?id=com.mojang.minecraftpe&hl=en_IN&pli=1'
      },
      {
        id: '2',
        title: 'Fortnite',
        price: 0,
        imageUrl: 'https://300mind.studio/blog/wp-content/uploads/2023/12/Fortnite-Game-Strategies.webp',
        rating: 4.5,
        platforms: ['PC', 'PlayStation', 'Xbox'],
        installUrl: 'https://www.fortnite.com/download?lang=en-US'
      },
      {
      id: '3',
        title: 'Subway Surfers',
        price: 0,
        imageUrl: 'https://play-lh.googleusercontent.com/Nlg5Ttuo4w36y_IpY2kNnfh0Ezf6pEcxnRqnfLGzLXCt0GdDrUdOJEJnacCkMBZZCfM=w5120-h2880-rw',
        rating: 4.4,
        platforms: ['PC', 'PlayStation', 'Xbox'],
        installUrl: 'https://play.google.com/store/apps/details?id=com.kiloo.subwaysurf&hl=en_IN'
      },
      {
        id: '4',
          title: 'Bloons TD',
          price: 7.60 ,
          imageUrl: 'https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQaELcB0gUfSLwbStA3x5R3B2Lrhek8kFh5D9aDK8LYIC_7Wak741L-yAZ_djizwkPJvjE8wyzPJ4q3t41Ul7-2ujwqKu36fJ0iMIUNcd-8H0HFM7nIWkk7BCrn-fqY4VhZi8GcKn5PHT0wqwUcC1U3if.jpg?r=efd',
          rating: 4.7,
          platforms: ['PC', 'PlayStation', 'Xbox'],
          installUrl: 'https://play.google.com/store/apps/details?id=com.ninjakiwi.bloonstd6&hl=en_IN'
        },
        {
          id: '5',
          title: 'Chess',
          price: 0,
          imageUrl: 'https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/PedroPinhata/phpvac83f.png',
          rating: 4.7,
          platforms: ['PC', 'PlayStation', 'Xbox'],
          installUrl: 'https://play.google.com/store/apps/details?id=com.chess&pcampaignid=merch_published_cluster_promotion_battlestar_top_picks&hl=en_IN'
        },
        {
          id: '6',
          title: 'Grand Theft Auto',
          price: 2.13,
          imageUrl: 'https://play-lh.googleusercontent.com/XRlCpj22PFJuFK43QcE3u5RxmoNUed7YO_zG-6F1PCqjrBIIURbTBDvTgLVVIk5pNeY=w480-h960-rw',
          rating: 4.6,
          platforms: ['PC', 'PlayStation', 'Xbox'],
          installUrl: 'https://play.google.com/store/apps/details?id=com.rockstargames.gtasa&hl=en_IN'
        },
        {
          id: '7',
          title: 'Terraria',
          price: 4.79,
          imageUrl: 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg?t=1731252354',
          rating: 4.5,
          platforms: ['PC', 'PlayStation', 'Mobile'],
          installUrl: 'https://play.google.com/store/apps/details?id=com.and.games505.TerrariaPaid&hl=en_IN'
        },
        {
          id: '8',
          title: 'Magic Jigsaw Puzzles',
          price: 0.0,
          imageUrl: 'https://play-lh.googleusercontent.com/qJmU7mH86lvZG0FJpqUQd7y46sGdwRL5zNMUC_2WcQzjWXQ6lwE44hJT6unMTRIsnBwp=w5120-h2880-rw',
          rating: 3.9,
          platforms: ['PC', 'PlayStation', 'Mobile'],
          installUrl: 'https://play.google.com/store/apps/details?id=com.bandagames.mpuzzle.gp&pcampaignid=merch_published_cluster_promotion_battlestar_browse_all_games&hl=en_IN'
        },
        {
          id: '9',
          title: 'Candy Crush Saga',
          price: 0.0,
          imageUrl: 'https://www.king.com/images/share/banners/candycrush.png?_v=kmoqjd',
          rating: 4.4,
          platforms: ['PC', 'PlayStation', 'Mobile'],
          installUrl: 'https://play.google.com/store/search?q=candy%20crush&c=apps&hl=en_IN',
        },
        {
          id: '10',
          title: 'Maze for Kids',
          price: 0.0,
          imageUrl: 'https://play-lh.googleusercontent.com/QIQuj4PcfX6PKIxZo3dzrxlHarR5d7MaUa12RVHdsIjbIbY2ZzxJMaSU-ABeqbEOk2y5=w5120-h2880-rw',
          rating: 3.3,
          platforms: ['PC', 'PlayStation', 'Mobile'],
          installUrl: 'https://play.google.com/store/apps/details?id=hu.crabs.kidmaze&hl=en_IN',
        },


    ];

    if (searchTerm && searchTerm.trim() !== '') {
      return fallbackGames.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return fallbackGames;
  }
}