import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {User} from '../models/user.model';
import {AlbumService} from './album.service';

export const jsonPlaceHolderUrl = 'https://jsonplaceholder.typicode.com';
export const userUrl = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users$ = new ReplaySubject<User[]>(1);

  constructor(private http: HttpClient, private albumService: AlbumService) {
    this.load();
  }

  load() {
    this.http.get<User[]>(`${jsonPlaceHolderUrl}/${userUrl}`)
        .subscribe((users: User[]) => {this.users$.next(users)});
  }

  getUsers$(): Observable<User[]> {
    return this.users$.asObservable();
  }

  choosePhoto(userId: number) {
    this.albumService.load(userId);
  }


}
