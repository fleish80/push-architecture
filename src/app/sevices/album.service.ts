import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Photo} from '../models/photo.model';
import {jsonPlaceHolderUrl} from './user.service';
import {HttpClient} from '@angular/common/http';

export const photosUrl = 'photos';

@Injectable({
    providedIn: 'root'
})
export class AlbumService {

    private photo$ = new ReplaySubject<Photo>(1);

    constructor(private http: HttpClient) {
    }

    load(userId: number) {
        this.http.get<Photo>(`${jsonPlaceHolderUrl}/${photosUrl}/${userId}`)
            .subscribe((photo: Photo) => {
                this.photo$.next(photo);
            });
    }

    getPhoto(): Observable<Photo> {
      return this.photo$.asObservable();
    }
 }
