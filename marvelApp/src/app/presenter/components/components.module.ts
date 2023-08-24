import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layouts/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CharacterCardComponent, DialogElementsExampleDialog } from './shared/character-card/character-card.component';
import {MatCardModule} from '@angular/material/card';
import { FavoritesComponent } from './shared/favorites/favorites.component';
import {MatButtonModule} from '@angular/material/button';
import { FavoriteCardComponent } from './shared/favorite-card/favorite-card.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HeaderComponent,
    CharacterCardComponent,
    FavoritesComponent,
    FavoriteCardComponent,
    DialogElementsExampleDialog
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
  ],
  exports: [
    HeaderComponent,
    CharacterCardComponent,
    FavoritesComponent
  ]
})
export class ComponentsModule { }
