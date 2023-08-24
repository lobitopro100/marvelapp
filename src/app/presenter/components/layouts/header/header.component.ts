import { Component } from '@angular/core';
import { Observable, Subscription, debounceTime, delay } from 'rxjs';
import { CharaterService } from 'src/app/service/charater.service';
import { DialogElementsExampleDialog } from '../../shared/character-card/character-card.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  search: string = '';
  loadingCharater = false;
  messageResults = false;
  dataCharacter: any[] = [];

  private searchSubscription: Subscription | undefined;

  public constructor(
    private charaterService: CharaterService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.initializeSearch();
  }

  initializeSearch() {
    this.searchSubscription = this.charaterService.searchInput
      .pipe(debounceTime(500))
      .subscribe((searchTerm) => {
        this.search = searchTerm;
        this.updateData();
      });
  }

  updateData() {
    if (this.search !== '') {
      this.charaterService.getData('name', this.search).subscribe((data) => {
        this.dataCharacter = data.data.results;

        this.dataCharacter.map(iten => {

        this.obtenerNombresDeComics(iten.comics.items).subscribe(
          (nombresDeComics) => {
            iten.comics = nombresDeComics;
            this.loadingCharater = true;
          }
        );
        });
        this.messageResults = false;
        if (this.dataCharacter.length == 0) {
          this.messageResults = true;
        }

      });
    } else {
      this.dataCharacter = [];
      this.loadingCharater = true;
      this.messageResults = false;
    }
  }

  onSearchChange() {
    this.charaterService.setSearchTerm(this.search);
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

      if(nombresDeComicsAlAzar.length === 0){
        nombresDeComicsAlAzar = ['No Related comics']
      }

      observer.next(nombresDeComicsAlAzar);
      observer.complete();
    }).pipe(delay(0));
  }

  openDialog(comic: string) {
    const dialogRef = this.dialog.open(DialogElementsExampleDialog, {
      data: { comicData: comic }
    });

    dialogRef.afterClosed().subscribe(result => {});

  }
}
