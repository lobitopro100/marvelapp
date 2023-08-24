import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CharaterService } from 'src/app/service/charater.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  p: number = 1;
  order: string = 'name';
  loadingCharater = false;

  orderby: any[] = [
    { value: 'name', viewValue: 'name (Asc)' },
    { value: 'modified', viewValue: 'modified (Asc)' },
    { value: '-name', viewValue: 'name (Desc)' },
    { value: '-modified', viewValue: 'modified (Desc)' },
  ];

  dataCharacter: any[] = [];

  public constructor(private charaterService: CharaterService) {}

  ngOnInit(): void {
    this.updateData();
  }

  updateData() {
    this.loadingCharater = false;
    this.charaterService.getData(this.order).subscribe((data) => {
      this.dataCharacter = data.data.results;
      this.loadingCharater = true;
    });
  }

  onOrderChange() {
    this.updateData();
  }
}
