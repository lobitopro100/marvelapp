import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject } from 'rxjs'; // Import BehaviorSubject

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private favoritesKey = 'favorites';
  private favoritesSubject = new BehaviorSubject<any[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    this.loadFavoritesFromLocalStorage();
  }

  private loadFavoritesFromLocalStorage() {
    const favoritesString = localStorage.getItem(this.favoritesKey);
    const favorites = favoritesString ? JSON.parse(favoritesString) : [];
    this.favoritesSubject.next(favorites); // Update BehaviorSubject
  }

  private saveFavoritesToLocalStorage(favorites: any[]) {
    localStorage.setItem(this.favoritesKey, JSON.stringify(favorites));
    this.favoritesSubject.next(favorites);
  }

  isFavorite(id: string): boolean {
    const favorites = this.favoritesSubject.getValue();
    return favorites.some((favorite: any) => favorite.id === id);
  }

  getFavorites() {
    return this.favoritesSubject.getValue();
  }

  addFavorite(id: string, name: string, urlImg: string) {
    const favorites = this.getFavorites();

    const existingFavorite = favorites.find(
      (favorite: any) => favorite.id === id
    );
    if (!existingFavorite) {
      favorites.push({ id, name, urlImg });
      this.saveFavoritesToLocalStorage(favorites);
    }
  }

  removeFavoriteById(id: string) {
    const favorites = this.getFavorites().filter(
      (favorite: any) => favorite.id !== id
    );
    this.saveFavoritesToLocalStorage(favorites);
  }
}
