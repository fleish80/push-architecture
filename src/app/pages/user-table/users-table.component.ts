import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UsersService} from '../../sevices/users/users.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {CurrentUserState} from '../../state/current-user-state.model';
import {currentUserId} from '../../state/current-user.reducer';
import * as UserActions from '../../state/current-user.actions';
import {HttpErrorResponse} from '@angular/common/http';
import {UsersControlsService} from '../../sevices/users/users-controls.service';


@Component({
    selector: 'app-user-table',
    template: `
        <div>
            <label>Filer</label>
            <input type="text" [formControl]="filterCtrl">
            
            counter: {{counter$ | async}}
        </div>
        <div *ngIf="loading$ | async">...loading</div>
        <div *ngIf="errorResponse$ | async as errorResponse">{{errorResponse.message}}</div>
        <table class="table" *ngIf="users$ | async as users">
            <thead>
            <tr>
                <th>Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Website</th>
                <th>Company</th>
                <th>Number of albums</th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let user of users" (click)="selectUser(user)"
                [class.selected]="(selectedUserId$ | async) === user.id">
                <td>{{user.name}}</td>
                <td>{{user.username}}</td>
                <td>{{user.email}}</td>
                <td>{{user.address.city }}/{{user.address.street}}/{{user.address.suite}}</td>
                <td>{{ user.phone }}</td>
                <td>
                    <a href="http://{{ user.website }}" target="_blank">
                        {{user.website}}
                    </a>
                </td>
                <td>{{user.company.name}}</td>
                <td>{{user.id}}</td>
            </tr>
            </tbody>
        </table>
    `,
    styles: [`
        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            text-align: start;
        }

        tr {
            height: 50px;
        }

        tr.selected {
            background-color: #5A8A8A;
            color: white;
        }

        tbody tr:hover {
            cursor: pointer;
            background-color: gray;
            color: white;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UsersService, UsersControlsService]
})
export class UsersTableComponent implements OnInit {

    users$: Observable<User[]>;
    loading$: Observable<boolean>;
    errorResponse$: Observable<HttpErrorResponse>;
    selectedUserId$: Observable<number>;
    counter$: Observable<number>;

    get filterCtrl() {
        return this.usersControlsService.filterCtrl;
    }

    constructor(private userService: UsersService,
                private userStore: Store<CurrentUserState>,
                private usersControlsService: UsersControlsService) {
    }

    ngOnInit(): void {
        this.users$ = this.userService.filteredUsers$;
        this.loading$ = this.userService.loading$;
        this.errorResponse$ = this.userService.errorResponse$;
        this.selectedUserId$ = this.userStore.select(currentUserId);
        this.counter$ = this.userService.counters$;
    }

    selectUser(user: User) {
        this.userStore.dispatch(UserActions.selectCurrentUser({currentUser: user}))
    }
}
