import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Game[] = [];
  private cartSubject = new BehaviorSubject<Game[]>([]);
  cartItems$ = this.cartSubject.asObservable();

  constructor() {
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('gameStoreCart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    }
  }

  private saveCart(): void {
    localStorage.setItem('gameStoreCart', JSON.stringify(this.cartItems));
    this.cartSubject.next([...this.cartItems]);
  }

  addToCart(game: Game): void {
    this.cartItems.push(game);
    this.saveCart();
  }

  removeFromCart(gameId: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== gameId);
    this.saveCart();
  }

  getCartItems(): Game[] {
    return [...this.cartItems];
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveCart();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, game) => total + game.price, 0);
  }

  getCartCount(): number {
    return this.cartItems.length;
  }
}