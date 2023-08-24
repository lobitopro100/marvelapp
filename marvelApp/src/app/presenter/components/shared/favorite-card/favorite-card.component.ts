import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FavoritesService } from 'src/app/service/favorites.service';
import { DialogElementsExampleDialog } from '../character-card/character-card.component';
import { CharaterService } from 'src/app/service/charater.service';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.component.html',
})
export class FavoriteCardComponent {
  @Input() title: string = '';
  @Input() id: string = '';
  @Input() imageSource: string = '';

  constructor(
    private favoritesService: FavoritesService,
    public dialog: MatDialog,
    private charaterService: CharaterService
  ) {}

  removeFavorite() {
    this.favoritesService.removeFavoriteById(this.id);
  }

  openDialog() {

    this.charaterService.getComicsId(this.id).subscribe((data) => {

      const comic = {
        resourceURI: data.data.results[0].resourceURI,
        name: data.data.results[0].title,
        id: data.data.results[0].id,
        price: data.data.results[0].prices[0].price,
        img:
          data.data.results[0].thumbnail.path +
          '.' +
          data.data.results[0].thumbnail.extension,
        isFavotite: this.favoritesService.isFavorite(data.data.results[0].id),
      };
      const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
        data: { comicData: comic },
      });

      dialogRef.afterClosed().subscribe((result) => {});
    });
  }
}
