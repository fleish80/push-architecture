import {Injectable} from '@angular/core';
import {Photo} from '../models/photo.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AbstractStoreService} from './abstract-store.service';
import {jsonPlaceHolderUrl} from './user.service';
import {Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {tapResponse} from '@ngrx/component-store';
import {Store} from '@ngrx/store';
import {UserState} from '../state/user-state.model';
import {currentUserId} from '../state/user.reducer';

export const photosUrl = 'photos';

@Injectable()
export class AlbumService extends AbstractStoreService<Photo> {

    constructor(private http: HttpClient, private userStore: Store<UserState>) {
        super(null)
        this.userStore.select(currentUserId)
            .subscribe((currentUserId: number) => {
                if (currentUserId) {
                    this.load(currentUserId);
                }
            });
    }

    readonly load = this.effect((userId$: Observable<number>) => {
        return userId$.pipe(
            tap(() => this.updateLoading(true)),
            switchMap((userId: number) => {
                    return this.fetch(userId).pipe(
                        tapResponse<Photo>(
                            (photo: Photo) => this.updateData(photo),
                            (errorResponse: HttpErrorResponse) => this.updateError(errorResponse)
                        )
                    );
                }
            ),
            tap(() => this.updateLoading(false))
        );
    })

    private fetch(userId: number): Observable<Photo> {
        return this.http.get<Photo>(`${jsonPlaceHolderUrl}/${photosUrl}/${userId}`);
    }
}
