import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharaterService {

  constructor(private http: HttpClient) { }

  private searchInputSubject = new BehaviorSubject<string>('');

  searchInput = this.searchInputSubject.asObservable();

  setSearchTerm(searchTerm: string) {
    this.searchInputSubject.next(searchTerm);
  }

  getData(orderBy: string, name: string = ''): Observable<any> {
    const URL = `https://gateway.marvel.com/v1/public/characters?${ name ? `nameStartsWith=${name}&` : ''}orderBy=${orderBy}&limit=100&apikey=df4b969e7039be6c1c09b4c131f9eb9b&hash=c8a17b4a6b222eac73f0eac59ec177b7&ts=1`;
    return this.http.get(URL);
  }

  getComicsId(id: string): Observable<any> {
    const URL = `https://gateway.marvel.com/v1/public/comics/${id}?apikey=df4b969e7039be6c1c09b4c131f9eb9b&hash=c8a17b4a6b222eac73f0eac59ec177b7&ts=1`;
    return this.http.get(URL);
  }

  getComicsByUrl(url: string): Observable<any> {
    const URL = `${url}?apikey=df4b969e7039be6c1c09b4c131f9eb9b&hash=c8a17b4a6b222eac73f0eac59ec177b7&ts=1`;
    return this.http.get(URL);
  }
}
