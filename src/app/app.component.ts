import {Component, OnInit} from '@angular/core';
import {User} from './models/user.model';
import {UserService} from './sevices/user.service';
import {Photo} from './models/photo.model';
import {AlbumService} from './sevices/album.service';

@Component({
    selector: 'app-root',
    template: `
        <app-user-table *ngIf="users" [users]="users" (getUser)="setPhoto($event)"></app-user-table>
        <app-photo *ngIf="photo" [photo]="photo"></app-photo>
    `,
    styles: []
})
export class AppComponent implements OnInit {

    users: User[];
    photo: Photo;

    constructor(private userService: UserService, private albumService: AlbumService) {
    }

    ngOnInit(): void {
        this.userService.getUsers()
            .subscribe((users: User[]) => {
                this.users = users;
            });
    }

    setPhoto(userId: number) {
        this.albumService.getPhoto(userId)
            .subscribe((photo: Photo) => {
                this.photo = photo;
            });
    }


}
