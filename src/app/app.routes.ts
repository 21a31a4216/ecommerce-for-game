import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { GameDetailsComponent } from './components/game-details/game-details.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, title: 'Game Store' },
  { path: 'cart', component: CartComponent, title: 'Your Cart' },
  { path: 'games/:id', component: GameDetailsComponent },
  { path: '**', redirectTo: '' }
];