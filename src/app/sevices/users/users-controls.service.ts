import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';
import {UsersService} from './users.service';
import {UsersFilteredService} from './users-filtered.service';
import {User} from '../../models/user.model';
import {combineLatest} from 'rxjs';
import {startWith} from 'rxjs/operators';

@Injectable()
export class UsersControlsService {

    filterCtrl: FormControl;

    constructor(private userService: UsersService, private usersFilteredService: UsersFilteredService) {
        this.filterCtrl = new FormControl();
        combineLatest([this.filterCtrl.valueChanges.pipe(startWith('')),
            this.userService.data$])
            .subscribe(([filterText, users]: [string, User[]]) => {
                if (users) {
                    this.usersFilteredService.setFilterUsers(filterText, users);
                }
            })
    }
}
