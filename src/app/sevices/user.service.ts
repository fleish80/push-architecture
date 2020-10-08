import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {AbstractStoreService} from './abstract-store.service';
import {GeneralService} from './general.service';
import {MVContext} from '../models/mv-context.model';
import {Observable} from 'rxjs';

export const jsonPlaceHolderUrl = 'https://jsonplaceholder.typicode.com';
export const userUrl = 'users';

@Injectable({
    providedIn: 'root'
})
export class UserService extends AbstractStoreService<User[]> {

    constructor(protected http: HttpClient, private generalService: GeneralService) {
        super(http);
        this.url = `${jsonPlaceHolderUrl}/${userUrl}`;
        this.load();
        this.getStore()
            .subscribe((context: MVContext<User[]>) => {
                if (context.data && !context.loading && !context.errorResponse) {
                    const users = context.data;
                    this.generalService.setUserId(users[0].id);
                }
            })
    }

    choosePhoto(userId: number) {
        this.generalService.setUserId(userId);
    }

    getUSerId$(): Observable<number> {
        return this.generalService.getUSerId$();
    }


}
