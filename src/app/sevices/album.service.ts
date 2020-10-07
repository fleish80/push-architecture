import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Photo} from '../models/photo.model';
import {jsonPlaceHolderUrl} from './user.service';
import {HttpClient} from '@angular/common/http';

export const photosUrl = 'photos';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

  getPhoto(userId: number): Observable<Photo> {
    return this.http.get<Photo>(`${jsonPlaceHolderUrl}/${photosUrl}/${userId}`);

  }
}
