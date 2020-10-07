import {Component, OnInit} from '@angular/core';
import {Photo} from '../../models/photo.model';
import {AlbumService} from '../../sevices/album.service';
import {Observable} from 'rxjs';
import {MVContext} from '../../models/mv-context.model';

@Component({
    selector: 'app-photo',
    template: `
        <ng-container *ngIf="photoContext$ | async as photoContext">
            <div *ngIf="photoContext.loading">...loading</div>
            <div *ngIf="photoContext.errorResponse">{{photoContext.errorResponse.message}}</div>
            <h2 class="photo-title">{{photoContext.data.title}}</h2>
            <img [src]="photoContext.data.thumbnailUrl" alt="">
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

    photoContext$: Observable<MVContext<Photo>>;

    constructor(private albumService: AlbumService) {
    }

    ngOnInit(): void {
        this.photoContext$ = this.albumService.getStore();
    }

}
