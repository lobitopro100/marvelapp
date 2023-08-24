import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CharaterService } from 'src/app/service/charater.service';
import { FavoritesService } from 'src/app/service/favorites.service';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss'],
})
export class CharacterCardComponent {
  @Input() characterName: string = '';
  @Input() imageSource: string = '';
  @Input() subtitle: string = '';
  @Input() relatedComics: string[] = [];

  relatedComicsList: any[] = [];
  showFullSubtitle: boolean = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.imageSource = this.imageSource .replace(/^http:/, 'https:');
    this.obtenerNombresDeComics(this.relatedComics).subscribe(
      (nombresDeComics) => {
        this.relatedComicsList = nombresDeComics;
      }
    );
  }

  obtenerNombresDeComics(comicsData: any): Observable<string[]> {
    return new Observable<string[]>((observer) => {
      let nombresDeComicsAlAzar: any[] = [];

      const totalComics = comicsData.length;
      const cantidadAObtener = 4;

      if (totalComics <= cantidadAObtener) {
        nombresDeComicsAlAzar = comicsData.map((comic: any) => comic);
      } else {
        const copiaComicsData = comicsData.slice();

        for (let i = 0; i < cantidadAObtener; i++) {
          const indiceAleatorio = Math.floor(
            Math.random() * copiaComicsData.length
          );
          nombresDeComicsAlAzar.push(
            copiaComicsData.splice(indiceAleatorio, 1)[0]
          );
        }
      }

      if (nombresDeComicsAlAzar.length === 0) {
        nombresDeComicsAlAzar = ['No Related comics'];
      }

      observer.next(nombresDeComicsAlAzar);
      observer.complete();
    }).pipe(delay(0));
  }
  openDialog(comic: string) {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      data: { comicData: comic },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }
}

@Component({
  selector: 'dialog-elements',
  templateUrl: './dialog-elements.html',
})
export class DialogElementsExampleDialog {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private charaterService: CharaterService,
    private favoritesService: FavoritesService
  ) {}

  public comics = this.data.comicData;

  ngOnInit(): void {
    this.charaterService
      .getComicsByUrl(this.comics.resourceURI)
      .subscribe((data) => {
        this.comics.id = data.data.results[0].id;
        this.comics.description = data.data.results[0].description;
        this.comics.price = data.data.results[0].prices[0].price;
        this.comics.img =
          data.data.results[0].thumbnail.path +
          '.' +
          data.data.results[0].thumbnail.extension;

        this.comics.isFavotite = this.favoritesService.isFavorite(
          this.comics.id
        );
      });
  }

  addFavorite(comics: any) {
    this.favoritesService.addFavorite(comics.id, comics.name, comics.img);
    this.comics.isFavotite = this.favoritesService.isFavorite(this.comics.id);
  }
}
