import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../sevices/user.service';
import {Observable} from 'rxjs';
import {MVContext} from '../../models/mv-context.model';
import {UserIdService} from '../../sevices/user-id.service';

@Component({
    selector: 'app-user-table',
    template: `
        <ng-container *ngIf="usersContext$ | async as userContext">
            <div *ngIf="userContext.loading">...loading</div>
            <div *ngIf="userContext.errorResponse">{{userContext.errorResponse.message}}</div>
            <table class="table" *ngIf="userContext.data as users">
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
                <tr *ngFor="let user of users" (click)="userClick(user.id)" [class.selected]="(selectedUserId$ | async) === user.id">
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
        </ng-container>
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
            background-color: #f0f0f5;

        }

        tbody tr:hover {
            cursor: pointer;
            background-color: gray;
            color: white;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTableComponent implements OnInit {

    usersContext$: Observable<MVContext<User[]>>;
    selectedUserId$: Observable<number>;

    constructor(private userService: UserService, private userIdService: UserIdService) {
    }

    ngOnInit(): void {
        this.usersContext$ = this.userService.getStore();
        this.selectedUserId$ = this.userIdService.getState();
    }

    userClick(userId: number) {
        this.userIdService.setState(userId);
    }
}
