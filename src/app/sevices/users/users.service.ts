import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../../models/user.model';
import {Observable} from 'rxjs';
import {tapResponse} from '@ngrx/component-store';
import {switchMap, tap} from 'rxjs/operators';
import {AbstractStore} from '../../store/abstract-store';

export const jsonPlaceHolderUrl = 'https://jsonplaceholder.typicode.com';
export const userUrl = 'users';

@Injectable()
export class UsersService extends AbstractStore<User[]> {

    constructor(private http: HttpClient) {
        super(null);
        this.load();
    }

    readonly load = this.effect((trigger$: Observable<void>) => {
        return trigger$.pipe(
            tap(() => this.updateLoading(true)),
            switchMap(() => {
                return this.fetch()
                    .pipe(
                        tapResponse(
                            (users: User[]) => this.updateData(users),
                            (errorResponse: HttpErrorResponse) => this.updateError(errorResponse),
                        ),
                    );
            }),
            tap(() => this.updateLoading(false))
        );

    });

    protected fetch(): Observable<User[]> {
        return this.http.get<User[]>(`${jsonPlaceHolderUrl}/${userUrl}`);
    }
}
