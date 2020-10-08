import {Injectable} from '@angular/core';
import {Photo} from '../models/photo.model';
import {HttpClient} from '@angular/common/http';
import {AbstractStoreService} from './abstract-store.service';
import {GeneralService} from './general.service';
import {jsonPlaceHolderUrl} from './user.service';

export const photosUrl = 'photos';

@Injectable({
    providedIn: 'root'
})
export class AlbumService extends AbstractStoreService<Photo> {

    constructor(protected http: HttpClient, private generalService: GeneralService) {
        super(http);
        this.generalService.getUSerId$()
            .subscribe((userId: number) => {
                this.url = `${jsonPlaceHolderUrl}/${photosUrl}/${userId}`;
                this.load();
            });
    }

 }
