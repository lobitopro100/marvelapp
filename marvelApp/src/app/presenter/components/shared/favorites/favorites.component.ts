import { Component } from '@angular/core';
import { FavoritesService } from 'src/app/service/favorites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  favorites: any[] = [];
  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.favorites = this.favoritesService.getFavorites();
    this.favoritesService.favorites$.subscribe((favorites) => {
      this.favorites = favorites;
    });
  }

}
