import {Component, OnInit} from '@angular/core';
import {Photo} from '../../models/photo.model';
import {AlbumService} from '../../sevices/album.service';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-photo',
    template: `
        <div *ngIf="loading$ | ngrxPush">...loading</div>
        <div *ngIf="errorResponse$ | ngrxPush as errorResponse">{{errorResponse.message}}</div>
        <ng-container *ngIf="photo$ | ngrxPush as photo">
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
    `],
    providers: [AlbumService]
})
export class PhotoComponent implements OnInit {

    photo$: Observable<Photo>;
    loading$: Observable<boolean>;
    errorResponse$: Observable<HttpErrorResponse>;

    constructor(private albumService: AlbumService) {
    }

    ngOnInit(): void {
        this.photo$ = this.albumService.data$;
        this.loading$ = this.albumService.loading$;
        this.errorResponse$ = this.albumService.errorResponse$;
    }

}
