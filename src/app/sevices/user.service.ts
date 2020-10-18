import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {GeneralService} from './general.service';

export const jsonPlaceHolderUrl = 'https://jsonplaceholder.typicode.com';
export const userUrl = 'users';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private users$ = new BehaviorSubject<User[]>(null);

    constructor(private http: HttpClient, private generalService: GeneralService) {
        this.load();
    }

    load() {
        this.http.get<User[]>(`${jsonPlaceHolderUrl}/${userUrl}`)
            .subscribe((users: User[]) => {
                this.users$.next(users);
            });

    }

    getStore(): Observable<User[]> {
        return this.users$.asObservable();
    }

    choosePhoto(userId: number) {
        this.generalService.setUserId(userId);
    }


}
