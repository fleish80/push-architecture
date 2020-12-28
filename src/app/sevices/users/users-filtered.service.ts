import {Injectable} from '@angular/core';
import {ReactiveStore} from '../../store/reactive-store';
import {User} from '../../models/user.model';

@Injectable()
export class UsersFilteredService extends ReactiveStore<User[]> {

    constructor() {
        super([]);
    }

    setFilterUsers(filterText: string, users: User[]) {
        const filteredUsers = users.filter((user: User) => {
            return user.name.includes(filterText) ||
                user.username.includes(filterText) ||
                user.email.includes(filterText) ||
                user.address.city.includes(filterText) ||
                user.address.street.includes(filterText) ||
                user.address.suite.includes(filterText) ||
                user.phone.includes(filterText) ||
                user.website.includes(filterText) ||
                user.company.name.includes(filterText) ||
                user.id.toString().includes(filterText);
        });
        this.updateData(filteredUsers);
    }


}
