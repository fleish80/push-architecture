import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {User} from '../models/user.model';
import {MVContext} from '../models/mv-context.model';
import {catchError, map} from 'rxjs/operators';
import {GeneralService} from './general.service';

export const jsonPlaceHolderUrl = 'https://jsonplaceholder.typicode.com';
export const userUrl = 'users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersContext$ = new BehaviorSubject<MVContext<User[]>>(null);

  constructor(private http: HttpClient, private generalService: GeneralService) {
    this.load();
  }

  load() {
    this.usersContext$.next({...this.usersContext$.getValue(), ...{loading: false}});
    this.http.get<User[]>(`${jsonPlaceHolderUrl}/${userUrl}`)
        .pipe(map((users: User[]) => {
          return {
            loading: false,
            data: users
          } as MVContext<User[]>
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of({
            loading: false,
            errorResponse
          } as MVContext<User[]>);
        }))
        .subscribe((context: MVContext<User[]>) => {this.usersContext$.next(context)});
  }

  getUsers$(): Observable<MVContext<User[]>> {
    return this.usersContext$.asObservable();
  }

  choosePhoto(userId: number) {
    this.generalService.setUserId(userId);
  }


}
