import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

export const jsonPlaceHolderUrl = 'https://jsonplaceholder.typicode.com';
export const userUrl = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${jsonPlaceHolderUrl}/${userUrl}`);
  }


}
