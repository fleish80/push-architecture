import {Component, OnInit} from '@angular/core';
import {User} from './models/user.model';
import {UserService} from './sevices/user.service';

@Component({
    selector: 'app-root',
    template: `
       <app-user-table *ngIf="users" [users]="users"></app-user-table>
    `,
    styles: []
})
export class AppComponent implements OnInit {
    title = 'push-architecture';
    users: User[];

    constructor(private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.getUsers()
            .subscribe((users: User[]) => {
                this.users = users;
            });
    }


}
