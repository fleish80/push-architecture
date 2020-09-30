import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import {Photo} from '../models/photo.model';

export const jsonPlaceHolderUrl = 'https://jsonplaceholder.typicode.com';
export const userUrl = 'users';
export const photosUrl = 'photos';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${jsonPlaceHolderUrl}/${userUrl}`);
  }

  getPhoto(userId: number): Observable<Photo> {
    return this.http.get<Photo>(`${jsonPlaceHolderUrl}/${photosUrl}/${userId}`);

  }
}
