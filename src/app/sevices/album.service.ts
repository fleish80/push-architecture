import {Injectable} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {Photo} from '../models/photo.model';
import {jsonPlaceHolderUrl} from './user.service';
import {HttpClient} from '@angular/common/http';
import {GeneralService} from './general.service';

export const photosUrl = 'photos';

@Injectable({
    providedIn: 'root'
})
export class AlbumService {

    private photo$ = new ReplaySubject<Photo>(1);

    constructor(private http: HttpClient, private generalService: GeneralService) {
        this.generalService.getUSerId$()
            .subscribe((userId: number) => {
                this.load(userId);
            })
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
