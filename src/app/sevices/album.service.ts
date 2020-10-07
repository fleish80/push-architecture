import {Injectable} from '@angular/core';
import {Photo} from '../models/photo.model';
import {HttpClient} from '@angular/common/http';
import {AbstractStoreService} from './abstract-store.service';

export const photosUrl = 'photos';

@Injectable({
    providedIn: 'root'
})
export class AlbumService extends AbstractStoreService<Photo> {


    constructor(public http: HttpClient) {
        super(http);
    }


 }
