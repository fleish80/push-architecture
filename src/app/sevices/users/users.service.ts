import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../../models/user.model';
import {Observable} from 'rxjs';
import {tapResponse} from '@ngrx/component-store';
import {switchMap, tap} from 'rxjs/operators';
import {AbstractStore} from '../../store/abstract-store';
import {UsersControlsService} from './users-controls.service';

export const jsonPlaceHolderUrl = 'https://jsonplaceholder.typicode.com';
export const userUrl = 'users';

@Injectable()
export class UsersService extends AbstractStore<User[]> {

    constructor(private http: HttpClient, private usersControlsService: UsersControlsService) {
        super([]);
        this.load();
    }

    readonly filteredUsers$ = this.select(
        this.usersControlsService.filterText$,
        this.data$,
        (filterText: string, users: User[]): User[] => {
            const filteredUsers = users.filter((user: User) => {
                return user.name.includes(filterText) ||
                    user.username.includes(filterText) ||
                    user.email.includes(filterText) ||
                    user.address.city.includes(filterText) ||
                    user.address.street.includes(filterText) ||
                    user.address.suite.includes(filterText) ||
                    user.phone.includes(filterText) ||
                    user.website.includes(filterText) ||
                    user.company.name.includes(filterText) ||
                    user.id.toString().includes(filterText);
            });
            return filteredUsers;
        }
    );

    readonly counters$ = this.select(this.filteredUsers$, (users: User[]) => users.length);

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

    private fetch(): Observable<User[]> {
        return this.http.get<User[]>(`${jsonPlaceHolderUrl}/${userUrl}`);
    }
}
