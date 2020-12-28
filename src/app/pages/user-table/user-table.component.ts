import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../sevices/user/user.service';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {UserState} from '../../state/user-state.model';
import {currentUserId} from '../../state/user.reducer';
import * as UserActions from '../../state/user.actions';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
    selector: 'app-user-table',
    template: `
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
    providers: [UserService]
})
export class UserTableComponent implements OnInit {

    users$: Observable<User[]>;
    loading$: Observable<boolean>;
    errorResponse$: Observable<HttpErrorResponse>;
    selectedUserId$: Observable<number>;

    constructor(private userService: UserService, private userStore: Store<UserState>) {
    }

    ngOnInit(): void {
        this.users$ = this.userService.data$;
        this.loading$ = this.userService.loading$;
        this.errorResponse$ = this.userService.errorResponse$;
        this.selectedUserId$ = this.userStore.select(currentUserId);
    }

    selectUser(user: User) {
        this.userStore.dispatch(UserActions.selectUser({currentUser: user}))
    }
}
