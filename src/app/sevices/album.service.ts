import {Injectable} from '@angular/core';
import {Photo} from '../models/photo.model';
import {HttpClient} from '@angular/common/http';
import {AbstractStoreService} from './abstract-store.service';
import {jsonPlaceHolderUrl} from './user.service';
import {UserIdService} from './user-id.service';

export const photosUrl = 'photos';

@Injectable({
    providedIn: 'root'
})
export class AlbumService extends AbstractStoreService<Photo> {

    constructor(protected http: HttpClient, private userIdService: UserIdService) {
        super(http);
        this.userIdService.getState()
            .subscribe((userId: number) => {
                this.load(`${jsonPlaceHolderUrl}/${photosUrl}/${userId}`);
            });
    }

 }
