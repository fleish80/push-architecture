import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../sevices/user.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-user-table',
    template: `
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
            <tr *ngFor="let user of users" (click)="userClick(user.id)">
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

        tbody tr:hover {
            cursor: pointer;
            background-color: gray;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTableComponent implements OnInit {

    users$: Observable<User[]>;

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.users$ = this.userService.getStore();
    }

    userClick(userId: number) {
        this.userService.choosePhoto(userId);
    }
}
