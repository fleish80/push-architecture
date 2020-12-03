import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {AbstractStoreService} from './abstract-store.service';
import {MVContext} from '../models/mv-context.model';
import {UserIdService} from './user-id.service';

export const jsonPlaceHolderUrl = 'https://jsonplaceholder.typicode.com';
export const userUrl = 'users';

@Injectable()
export class UserService extends AbstractStoreService<User[]> {

    constructor(protected http: HttpClient, private userIdService: UserIdService) {
        super(http, `${jsonPlaceHolderUrl}/${userUrl}`);
        this.load();
        this.getStore()
            .subscribe((context: MVContext<User[]>) => {
                if (context.data && !context.loading && !context.errorResponse) {
                    const users = context.data;
                    this.userIdService.setState(users[0].id);
                }
            })
    }
}
