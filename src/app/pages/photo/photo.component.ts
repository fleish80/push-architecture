import {Component, OnInit} from '@angular/core';
import {Photo} from '../../models/photo.model';
import {AlbumService} from '../../sevices/album.service';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-photo',
    template: `
        <ng-container *ngIf="photo$ | async as photo">
            <h2 class="photo-title">{{photo.title}}</h2>
            <img [src]="photo.thumbnailUrl" alt="">
        </ng-container>
    `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }

        .photo-title {
            font-size: 30px;
        }
    `]
})
export class PhotoComponent implements OnInit {

    photo$: Observable<Photo>;

    constructor(private albumService: AlbumService) {
    }

    ngOnInit(): void {
        this.photo$ = this.albumService.getStore();
    }

}
